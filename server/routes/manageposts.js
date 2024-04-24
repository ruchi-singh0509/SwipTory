const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("../models/posts");
const SavePost = require("../models/savePosts");
const fetchUserID = require("../middleware/fetchuserID");
const isUserAuthenticated = require("../middleware/isUserAuthenticated");

router.post("/like/:postID",isUserAuthenticated,fetchUserID,async (req, res) => {
    try {
      const user_id = req.user_id;
      const post_id = req.params.postID;

      // Find the post and its index in the array
      const userPost = await Post.findOne({ "posts._id": post_id });

      if (userPost) {
        const postIndex = userPost.posts.findIndex(
          (post) => post._id.toString() === post_id
        );

        if (
          postIndex !== -1 &&
          userPost.posts[postIndex] &&
          userPost.posts[postIndex].likes
        ) {
          // Check if the user has already liked the post
          const hasLiked = userPost.posts[postIndex].likes.some(
            (like) => like.user_id && like.user_id.toString() === user_id
          );

          if (hasLiked) {
            await Post.updateOne(
              { "posts._id": post_id },
              {
                $inc: { "posts.$.likeCount": -1 },
                $pull: {
                  "posts.$.likes": {
                    user_id: new mongoose.Types.ObjectId(user_id),
                  },
                },
              }
            );

            const updatedPost = await Post.findOne({ "posts._id": post_id });

            return res.json({
              message: "Like removed",
              success: true,
              likeCount: updatedPost.posts[postIndex].likeCount,
            });
          }

          await Post.updateOne(
            { "posts._id": post_id },
            {
              $inc: { "posts.$.likeCount": 1 },
              $push: {
                "posts.$.likes": {
                  user_id: new mongoose.Types.ObjectId(user_id),
                },
              },
            }
          );
          const updatedPost = await Post.findOne({ "posts._id": post_id });
          return res.json({
            message: "Post liked",
            success: true,
            likeCount: updatedPost.posts[postIndex].likeCount,
          });
        }
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }
);

router.post('/bookmark/:postID', isUserAuthenticated, fetchUserID, async (req, res) => {
  try {
    const user_id = req.user_id;
    const post_id = req.params.postID;

    // Check if the post exists
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }

    // Find or create the SavePost document for the user
    let savePost = await SavePost.findOne({ user_id });

    if (!savePost) {
      savePost = await SavePost.create({
        user_id,
        posts: [{ post }],
      });
    } else {
      const isPostAlreadyBookmarked = savePost.posts.some(
        (bookmark) => bookmark?.post?.equals(post._id)
      );

      if (!isPostAlreadyBookmarked) {
        savePost.posts.push({ post });
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Post already bookmarked",
        });
      }
    }

    await savePost.save();

    res.json({
      status: "saved",
      message: "Post saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'failed', message: 'Internal server error' });
  }
});

router.get("/bookmarks/:userID", isUserAuthenticated,fetchUserID ,async (req, res) => {
  try {
    const user_id = req.user_id;
    const savePost = await SavePost.findOne({ user_id: user_id }).lean();
   
    if (!savePost) {
      return res.status(404).json({
        status: "failed",
        message:'Bookmarks not available'
      });
    }

    // Populate the posts field to get the actual post documents
    await SavePost.populate(savePost, { path: "posts.post" });

    res.json({
      status: "success",
      bookmarks: savePost.posts,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "failed", message: "Internal server error" });
  }
});

router.get("/post/:id",async(req,res)=>{
  try{
    const post_id = req.params.id;
    const findPost = await Post.findOne({_id : post_id })
    if(!findPost){
      res.status(404).json({
        status:'Failed',
        message:'Post not found',
      })
    }

      res.json({
        status:'success',
        post:findPost
      })

  }catch(err){
    console.log(err)
    res.status(500).json(({
      status:'failed',
      message:'Internal server error'
    }))
  }
})

router.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, images, category } = req.body;
    await Post.findByIdAndUpdate(id, {
      heading,
      description,
      images,
      category,
    });
    res.status(200).json({
      status: "success",
      message: "post updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "internal server error",
    });
  }
});


module.exports = router;
