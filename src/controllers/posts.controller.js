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
  if (req.query.author) {
    fetchAuthor(req, res);
  } else {
    fetchOnePost(req, res);
  }
};

const fetchOnePost = async (req, res) => {
  try {
    if (ObjectId.isValid(req.body.post_id)) {
      const fetchPost = await postModel.findById(req.body.post_id);
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
  const { id } = req.user;
  let postSucces = false;
  let userSucces = false;

  try {
    if (ObjectId.isValid(req.body.post_id)) {
      await postModel
        .findOneAndUpdate(
          { _id: req.body.post_id },
          { $push: { liked_by: id }, $inc: { likes: 1 } },
          { upsert: true }
        )
        .then(() => (userSucces = true))
        .catch((err) => res.status(500).send({ message: err }));
      const likedPost = await postModel.findById(req.body.post_id);
      await userModel
        .findOneAndUpdate(
          { _id: id },
          { $push: { liked_posts: likedPost } },
          { upsert: true }
        )
        .then(() => (postSucces = true))
        .catch((err) => res.status(500).send({ message: err }));
      if (postSucces && userSucces) return res.status(200).send("Like saved.");
    } else {
      return res.status(500).send({ err: "invalid id" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const savePost = async (req, res) => {
  const { id } = req.user;
  try {
    if (ObjectId.isValid(req.body.post_id)) {
      const fetchPost = await postModel.findById(req.body.post_id);
      if (fetchPost) {
        await userModel
          .findOneAndUpdate(
            { _id: id },
            { $push: { saved_posts: fetchPost } },
            { upsert: true }
          )
          .then(() => res.status(200).send("Post Saved."))
          .catch((err) => res.status(500).send({ message: err }));
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

const fetchAuthor = async (req, res) => {
  const { author } = req.query;
  const { id } = req.user;

  try {
    const user = await userModel.findById(id);
    if (author === id || user.following.includes(author)) {
      if (ObjectId.isValid(author)) {
        const post = await postModel.find({ author: author });
        res.status(200).send(post);
      } else {
        return res.status(500).send({ err: "invalid id" });
      }
    } else {
      return res.status(500).send({ err: "You dont follow this user" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const likedBy = async (req, res) => {
  const { user_id } = req.query;
  try {
    const user = await userModel.findById(user_id);
    if (user.show_likes) {
      res.status(200).send(user.liked_posts);
    } else {
      return res.status(500).send({ err: "user dosent show likes" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
const savedBy = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await userModel.findById(id);
    res.status(200).send(user.saved_posts);
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
  likedBy,
  savedBy,
};
