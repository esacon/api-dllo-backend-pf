const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: { type: [Object],defaul:[] },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
