const express = require("express");
const app = express();
const blogsController = require("../Controllers/blog.controller");

app.post("/create", blogsController.createBlog); // API For user Registration

module.exports = app;
