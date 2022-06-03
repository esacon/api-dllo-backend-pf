const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
    trim: true,
  },
  show_likes: {
    type: Boolean,
    default: true,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId }],
  following: [{ type: mongoose.Schema.Types.ObjectId }],
  followers: [{ type: mongoose.Schema.Types.ObjectId }],
  saved_posts: { type: [Object] },
  liked_posts: { type: [Object] },
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
