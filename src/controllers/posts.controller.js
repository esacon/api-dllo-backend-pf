const postModel = require('../models/posts.model');

const createPost = async (req, res) => {
    const post = new postModel(req.body);

    try {
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send(error);
    }
}

const fetchPost = async (req, res) => {
    try {
        let posts = [];
        if (req.query.post_id){
            posts = await postModel.findById(req.query.post_id);
        } else {
            posts = await postModel.find({ 'owner_id': req.query.user_id });
        }
        res.status(200).send(posts);   
    } catch (error) {
        res.status(500).send(error)
    }
}

const fetchRecentPosts = async (req, res) => {    
    try {
        res.status(200).json(await postModel.find().sort({created_date: 'desc'}));      
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createPost, fetchPost, fetchRecentPosts
}
