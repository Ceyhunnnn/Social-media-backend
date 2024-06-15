const posts = require("../models/postModel");
const APIError = require("../utils/error");
const Response = require("../utils/response");

const createUserPost = (req, res) => {
  const newPost = new posts(req.body);
  newPost
    .save()
    .then((response) => new Response(null, "Post shared").created(res))
    .catch(() => new APIError("Not Created", 400));
};
const getUserPosts = async (req, res) => {
  const { id } = req.params;
  const userPosts = await posts.find({ userId: id }).sort({ createdAt: -1 });
  if (userPosts) {
    new Response(userPosts, "").success(res);
  } else {
    new Response(null, "").success(res);
  }
};

module.exports = {
  createUserPost,
  getUserPosts,
};
