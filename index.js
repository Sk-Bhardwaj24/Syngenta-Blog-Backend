const http = require("http");
const app = require("./main.route");
// const app = require("./Routes/user.route");
const connectToDB = require("./DBConnection/mongoDB");
const PORT = process.env.PORT || 9008;
http.createServer(app).listen(PORT, () => {
  new connectToDB();
  console.log(`Blog-Api server is running on port no ${PORT}`);
});
