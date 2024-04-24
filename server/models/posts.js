const mongoose = require("mongoose");
const LikeSchema = require("./likeSchema")

const postSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
    trim: false,
  },
  category: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  likes:[LikeSchema]
 
});

const userpostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
  },
  posts: [postSchema],
});

const Post = mongoose.model("Post", userpostSchema);
module.exports = Post;
