const express = require("express");
const app = express();
const userController = require("../Controllers/user.controller");

app.post("/register", userController.Register); // API For user Registration

module.exports = app;
