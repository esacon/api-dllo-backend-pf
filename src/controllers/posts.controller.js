const postModel = require("../models/posts.model");
const userModel = require("../models/users.model");

var ObjectId = require("mongoose").Types.ObjectId;

const createPost = async (req, res) => {
  const { author, img_url, bio } = req.body;
  const newPost = new postModel({
    author,
    img_url,
    bio,
  });
  try {
    await newPost.save();
    return res.status(200).send({});
  } catch (error) {
    return res.status(500).send(error);
  }
};

const fetchPost = async (req, res) => {
  try {
    if (ObjectId.isValid(req.body.post_id)) {
      const fetchPost = await postModel.findById(req.body.post_id);
      console.log(fetchPost);
      if (fetchPost) {
        return res.status(200).send(fetchPost);
      } else {
        return res.status(500).send({ err: "No post found" });
      }
    } else {
      return res.status(500).send({ err: "invalid id" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const likePost = async (req, res) => {
  try {
    if (ObjectId.isValid(req.body.post_id)) {
      postModel.findOneAndUpdate(
        { _id: req.body.post_id },
        { $inc: { likes: 1 } },
        { upsert: true },
        function (err) {
          if (err) {
            return res.status(500).send({ err: "failed to update" });
          } else {
            return res.status(200).send("Like saved.");
          }
        }
      );
    } else {
      return res.status(500).send({ err: "invalid id" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const savePost = async (req, res) => {
  try {
    if (ObjectId.isValid(req.body.post_id)) {
      const fetchPost = await postModel.findById(req.body.post_id);
      if (fetchPost) {
        if (ObjectId.isValid(req.body.user_id)) {
          userModel.findOneAndUpdate(
            { _id: req.body.user_id },
            { $push: { saved_posts:fetchPost } },
            { upsert: true },
            function (err) {
              if (err) {
                return res.status(500).send({ err: "failed to update" });
              } else {
                return res.status(200).send("Post Saved.");
              }
            }
          );
        } else {
          return res.status(500).send({ err: "Invalid user ID" });
        }
      } else {
        return res.status(500).send({ err: "No post found" });
      }
    } else {
      return res.status(500).send({ err: "invalid id" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const commentPost = async (req, res) => {
  try {
    if (ObjectId.isValid(req.body.post_id)) {
      postModel.findOneAndUpdate(
        { _id: req.body.post_id },
        { $push: { comments: req.body.comment } },
        { upsert: true },
        function (err) {
          if (err) {
            return res.status(500).send({ err: "failed to update" });
          } else {
            return res.status(200).send("Comment saved.");
          }
        }
      );
    } else {
      return res.status(500).send({ err: "invalid id" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createPost,
  fetchPost,
  likePost,
  savePost,
  commentPost,
};
