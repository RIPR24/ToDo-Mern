const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Usermodel = require("./models/Users");
const { createHmac } = require("crypto");
const { decrypt, encrypt } = require("./utils/encription");
require("dotenv").config();

const db = mongoose.connect(process.env.API_URI);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("this runs");
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Yo");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const chk = await Usermodel.findOne({ username: username });
  if (chk) {
    const hpass = createHmac("sha256", process.env.SECRET)
      .update(password)
      .digest("base64");
    if (hpass === chk.password) {
      chk.cards = decrypt(username, chk.cards);
      const tok = jwt.sign({ id: chk._id }, process.env.ACCESS_TOKEN, {
        expiresIn: "30d",
      });
      res.json({
        status: "success",
        user: { username: chk.username, cards: chk.cards, token: tok },
      });
    } else {
      res.json({ status: "Wrong Password" });
    }
  } else {
    res.json({ status: "No User Found" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password, data } = req.body;
  const chk = await Usermodel.find({ username: username });
  if (chk.length > 0) {
    res.json({ status: "User Already Exist" });
  } else {
    const hpass = createHmac("sha256", process.env.SECRET)
      .update(password)
      .digest("base64");

    const cards = encrypt(username, JSON.stringify(data));
    const user = await Usermodel.create({
      username: username,
      password: hpass,
      cards: cards || "",
    });
    user.cards = decrypt(username, user.cards);
    const tok = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "30d",
    });
    res.json({
      status: "success",
      user: { username: chk.username, cards: chk.cards, token: tok },
    });
  }
});

app.post("/addcard", async (req, res) => {
  const { id, data } = req.body;
  const user = await Usermodel.findById(id);
  user.cards = encrypt(user.username, JSON.stringify(data));

  await user.save();
  res.json({ user, status: "success" });
});

app.post("/logtok", async (req, res) => {
  const { tok } = req.body;
  jwt.verify(tok, process.env.ACCESS_TOKEN, async (err, pl) => {
    if (err) {
      res.json({ status: "failed" });
    } else {
      const chk = await Usermodel.findById(pl.id);
      if (chk.username) {
        chk.cards = decrypt(chk.username, chk.cards);
        const tok = jwt.sign({ id: chk._id }, process.env.ACCESS_TOKEN, {
          expiresIn: "30d",
        });
        res.json({
          status: "success",
          user: { username: chk.username, cards: chk.cards, token: tok },
        });
      }
    }
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "Server Error",
    message: err.message || "Server Error",
  });
});
