const UserModel = require("../Models/user.model");

// For Registering User to  server
async function Register(req, res) {
  try {
    let userDetails = req.body;
    let useremail = userDetails.email;
    if ((await UserModel.find({ email: useremail })) == useremail) {
      res.status(200).json({
        status: "User is already registered with this email address",
      });
      return;
    }
    let response = await UserModel.insertMany([userDetails]);
    console.log(response);
    res.status(200).json({
      status: "Registration Successfull",
      user: response,
    });
  } catch (error) {
    res.status(401).json({
      status: "Registraton Failed",
      error: error,
    });
  }
}

module.exports = {
  Register,
};
