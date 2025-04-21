const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cards: String,
});

const Usermodel = mongoose.model("users", UserSchema);
module.exports = Usermodel;
