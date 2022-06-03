const express = require("express");
const router = express.Router();

const Post = require("../controllers/posts.controller");
const { validateToken } = require("../middleware/auth.middleware");

router.post("/", validateToken, Post.createPost);
router.get("/", validateToken, Post.fetchPost);
router.post("/like", validateToken, Post.likePost);
router.post("/save", validateToken, Post.savePost);
router.post("/comment", validateToken, Post.commentPost);
router.get("/liked-by", validateToken, Post.likedBy);
router.get("/saved-by", validateToken, Post.savedBy);

module.exports = router;
