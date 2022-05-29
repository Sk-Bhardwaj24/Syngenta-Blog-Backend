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
  console.log(userId);
  let searchobj = {};
  searchobj["_id"] = blogId;

  let response = await BlogModel.findOne({ searchobj });
  let userlikeArray = response.userlikes;
  console.log(userlikeArray);

  try {
    console.log(userlikeArray.includes(userId));
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
      // console.log(res2);
      res.status(200).json({
        status: "Liked successful",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "Error Occured",
    });
  }
}

// fetching all blogs
async function getBlog(req, res) {
  try {
    let blogs = await BlogModel.find({}).sort({ likes: -1 });
    res.status(200).json({
      status: "Success",
      blogs: blogs,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
}

// For getting all the detail of particular Blog
async function Blog(req, res) {
  try {
    let blogId = req.headers.blogid;
    let blogDetails = await BlogModel.findOne({ _id: blogId });
    res.status(200).json({
      status: "Success",
      blog: blogDetails,
    });
  } catch (error) {
    res.status(401).json({
      status: "Failed",
    });
  }
}

// For Searching any blog by Author Name and Blog Title
async function SearchBlog(req, res) {
  try {
    let author = req.query.author;
    let title = req.query.title;
    // console.log(author, title);
    let AuthorDetails = await UserModel.findOne({
      name: { $regex: author, $options: "$i" },
    });
    let response = await BlogModel.find({
      $and: [
        { title: { $regex: title, $options: "$i" } },
        { author: AuthorDetails._id },
      ],
    });

    if (response.length) {
      res.status(200).json({
        status: "Successful",
        blog: response,
      });
    } else {
      res.status(401).json({
        message: "Not Found",
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "Author or Title name is wrong",
    });
  }
}

// For Publishing Blog
async function PublishBlog(req, res) {
  try {
    const blogId = req.headers.blogid;
    await BlogModel.updateOne({ _id: blogId }, { published: true });
    res.status(200).json({
      status: "Published",
    });
  } catch (error) {
    res.status(401).json({
      status: "unsuccessful",
      message: error,
    });
  }
}

module.exports = {
  createBlog,
  like,
  getBlog,
  Blog,
  SearchBlog,
  PublishBlog,
};
