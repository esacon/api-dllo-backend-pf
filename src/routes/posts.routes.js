const express = require('express');
const router = express.Router();

const Post = require('../controllers/posts.controller');

router.get('/', Post.fetchPost);
router.get('/liked-by', Post.fetchPost);
router.get('/saved-by', Post.fetchPost);
router.get('/timeline', Post.fetchPost);

router.post('/', Post.createPost);
router.post('/like', Post.createPost);
router.post('/save', Post.createPost);

module.exports = router;