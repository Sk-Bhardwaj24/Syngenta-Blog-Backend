const UserModel = require("../Models/user.model");

// For Registering User to  server
async function Register(req, res) {
  try {
    let userDetails = req.body;
    let searchobj = {};
    searchobj["email"] = userDetails.email;

    if ((await UserModel.find(searchobj)).length === 0) {
      let response = await UserModel.insertMany([userDetails]);

      res.status(200).json({
        status: "Registration Successfull",
        user: response,
      });
    } else {
      res.status(200).json({
        status: "User is already registered with this email address",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "Registraton Failed",
    });
  }
}
async function Login(req, res) {
  try {
    let userDetails = req.body;
    let searchobj = {};
    searchobj["email"] = userDetails.email;
    let response = await UserModel.find(searchobj);
    if (response.length === 0) {
      res.status(200).json({
        status: "Register First",
      });
    } else {
      res.status(200).json({
        status: "Login Successfull",
        user: response,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "Login Failed",
    });
  }
}

module.exports = {
  Register,
  Login,
};
