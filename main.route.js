const express = require("express");
const app = express();
const userRoute = require("./Routes/user.route.js");
const bodyParser = require("body-parser");
app.use(bodyParser.json([]));
app.use("/user", userRoute);

module.exports = app;
