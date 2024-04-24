const mongoose = require("mongoose");

const savePostSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  posts: [
    {
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    },
  ],
});

const SavePost = mongoose.model("SavePost", savePostSchema);
module.exports = SavePost;
