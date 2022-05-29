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
async function Like(req, res) {
  let userId = req.headers.userid;
  let blogId = req.headers.blogid;
  // console.log(blogId);
  let response = await BlogModel.findOne({ _id: blogId });
  let LikedByarr = response.likedBy;
  if (LikedByarr.includes(userId)) {
    try {
      let like = response.likes;
      like--;
      let index = LikedByarr.indexOf(authorId);
      LikedByarr.splice(index, 1);
      await BlogModel.updateOne({ _id: blogId }, { likes: like });
      await BlogModel.updateOne({ _id: blogId }, { likedBy: LikedByarr });
      res.status(200).json({
        status: "Unliked Succefully",
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        status: "Error Occured",
      });
    }
  } else {
    let like = response.likes;
    like++;
    LikedByarr.push(authorId);
    await BlogModel.updateOne({ _id: blogId }, { likes: like });
    await BlogModel.updateOne({ _id: blogId }, { likedBy: LikedByarr });
    res.status(200).json({
      status: "Liked Successfully",
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

// For getting all the detail of Particular Blog
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
async function Search(req, res) {
  try {
    let author = req.query.author;
    let title = req.query.title;
    let AuthorDetail = await AuthorModel.findOne({
      name: { $regex: author, $options: "$i" },
    });
    let response = await BlogModel.find({
      $and: [
        { title: { $regex: title, $options: "$i" } },
        { author: AuthorDetail._id },
      ],
    });

    if (response.length) {
      res.status(200).json({
        status: "Successfully Fetched",
        blog: response,
      });
    } else {
      res.status(401).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "Author or Title name is not Correct",
    });
  }
}

// For Publishing Blog
async function Publish(req, res) {
  try {
    const blogId = req.headers.blogid;
    await BlogModel.updateOne({ _id: blogId }, { published: true });
    res.status(200).json({
      status: "Successfully Published",
    });
  } catch (error) {
    res.status(401).json({
      status: "Error occured during Publishing",
      message: error,
    });
  }
}

// Dashboard
function Dashboard(req, res) {
  res.send("This is Dashboard");
}

module.exports = {
  createBlog,
  Like,
  AllBlogs,
  Blog,
  Search,
  Publish,
  Dashboard,
};
