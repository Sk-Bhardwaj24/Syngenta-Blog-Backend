const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
  userlikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  label: [{ type: String }],
  published: { type: Boolean, default: false }, // For Checking Blog is Published or Not
});

const Blog = mongoose.model("Blogs", blogSchema);
module.exports = Blog;
