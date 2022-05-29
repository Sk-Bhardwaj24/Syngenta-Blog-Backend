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

// For Like or Unlike any Blog
async function like(req, res) {
  let userId = req.headers.userid;
  let blogId = req.headers.blogid;
  // console.log(blogId);
  let searchobj = {};
  searchobj["_id"] = blogId;

  let response = await BlogModel.findOne({ searchobj });
  let userlikeArray = response.userlikes;

  try {
    if (userlikeArray.includes(userId)) {
      let like = response.likes;
      like--;
      let index = userlikeArray.indexOf(userId);
      userlikeArray.splice(index, 1);
      await BlogModel.updateOne({ _id: blogId }, { likes: like });
      await BlogModel.updateOne({ _id: blogId }, { userlikes: userlikeArray });
      res.status(200).json({
        status: "Unliked Succefully",
      });
    } else {
      let like = response.likes;
      like++;
      userlikeArray.push(userId);
      await BlogModel.updateOne({ _id: blogId }, { likes: like });
      await BlogModel.updateOne({ _id: blogId }, { userlikes: userlikeArray });
      res.status(200).json({
        status: "Liked Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "Error Occured",
    });
  }
}

// For Getting all Blogs
async function AllBlogs(req, res) {
  try {
    let blogs = await BlogModel.find({}).sort({ likes: -1 });
    res.status(200).json({
      status: "Success Fetched All Blogs",
      blogs: blogs,
    });
  } catch (error) {
    res.status(401).json({
      status: "Error Occured during Fetching All blogs",
      error: error,
    });
  }
}

module.exports = {
  createBlog,
  like,
};
