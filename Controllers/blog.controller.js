const { default: mongoose } = require("mongoose");
const BlogModel = require("../Models/blogList.model");
const UserModel = require("../Models/user.model");

// For Creating a Blog
async function createBlog(req, res) {
  try {
    let blogDetails = req.body;
    let id = req.headers.userid;

    blogDetails.userId = mongoose.Types.ObjectId(id);
    let response = await BlogModel.insertMany([blogDetails]);
    console.log(response);
    res.status(200).json({
      status: "Blog Successfully Saved",
      blog: response,
    });
  } catch (error) {
    res.status(401).json({
      status: "Error Occured in Saving Blog",
      error: error,
    });
  }
}

module.exports = {
  createBlog,
};
