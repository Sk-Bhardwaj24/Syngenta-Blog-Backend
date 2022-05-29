const express = require("express");
const app = express();
const blogsController = require("../Controllers/blog.controller");

app.post("/create", blogsController.createBlog); // API For user Registration
app.post("/like", blogsController.like);
app.get("/allblogs", blogsController.getBlog);
module.exports = app;
