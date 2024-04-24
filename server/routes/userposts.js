const express = require("express");
const router = express.Router();
const fetchUserID = require("../middleware/fetchuserID.js");
const isUserAuthenticated = require("../middleware/isUserAuthenticated.js");
const Post = require("../models/posts.js");

//create new post
router.post("/post", isUserAuthenticated, fetchUserID, async (req, res) => {
  try {
    const { slides } = req.body;
    const user_id = req.user_id;

    // Create a new post with a single array containing all slides
    const newPost = await Post.create({
      user_id,
      posts: slides.map((slide) => ({
        heading: slide.heading,
        description: slide.description,
        images: slide.images,
        category: slide.category,
      })),
    });

    res.json({
      message: "post created successfully",
      post: newPost,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "internal server error" });
  }
});

//fetch data using users id
router.get("/posts/:user_id",isUserAuthenticated ,fetchUserID, async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const userPosts = await Post.find({ user_id: user_id });
    return res.status(200).json({
      status: "success",
      data: userPosts,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
});

//fetch according to filters
router.get("/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const userPosts = await Post.find({ "posts.category": category });

    // Extract posts with the specified category
    const categoryPosts = userPosts.map(userPost => {
      return userPost.posts.find(post => post.category === category);
    });

    res.json({
      success: true,
      message: `${category} posts fetched successfully`,
      data: { posts: categoryPosts },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
