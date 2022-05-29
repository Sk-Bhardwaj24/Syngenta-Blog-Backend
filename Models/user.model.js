const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email should be Unique
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
