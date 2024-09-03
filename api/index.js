const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Usermodel = require("./models/Users");
require("dotenv").config();

const db = mongoose.connect(process.env.API_URI);

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log("this runs", db);
});

app.get("/", (req, res) => {
  res.send("Yo");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const chk = await Usermodel.find({ username: username });
    if (chk.length > 0) {
      if (chk[0].password === password) {
        res.json({ status: "success", user: chk[0] });
      } else {
        res.json({ status: "Wrong Password" });
      }
    } else {
      res.json({ status: "No User Found" });
    }
  } catch (error) {
    res.json({ status: "failed" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const chk = await Usermodel.find({ username: username });
    if (chk.length > 0) {
      res.json({ status: "User Already Exist" });
    } else {
      const user = await Usermodel.create({
        username: username,
        password: password,
        cards: { idc: 0, data: [] },
      });
      res.json({ status: "success", user });
    }
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
});

app.post("/addcard", async (req, res) => {
  const { id, data, idc } = req.body;
  const user = await Usermodel.findById(id);
  user.cards = { idc, data };
  await user.save();
  res.json({ user, status: "success" });
  try {
  } catch (error) {
    res.json({ status: "failed" });
  }
});
