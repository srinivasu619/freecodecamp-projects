const mongoose = require("mongoose");
const Exercise = require("./exercise");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  exercises: [Exercise]
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
