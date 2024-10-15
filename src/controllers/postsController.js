const posts = require("../models/postModel");
const APIError = require("../utils/error");
const Response = require("../utils/response");
const createUserPost = (req, res) => {
  const newPost = new posts(req.body);
  newPost
    .save()
    .then(async (response) => {
      new Response(null, "Post shared").created(res);
      await updatePostDataWithSocket();
    })
    .catch(() => new APIError("Not Created", 400));
};
const getUserPosts = async (req, res) => {
  const { id } = req.params;
  const userPosts = await posts.find({ user: id }).sort({ createdAt: -1 });
  if (userPosts) {
    new Response(userPosts, "").success(res);
  } else {
    new Response(null, "").success(res);
  }
};
const getTopPosts = async (req, res) => {
  const topPosts = await posts
    .find()
    .populate("user", "firstName lastName title")
    .sort({ createdAt: -1 })
    .limit(10);
  if (topPosts) {
    new Response(topPosts, "").success(res);
  }
};
const deleteUserPost = async (req, res) => {
  const { id } = req.params;
  const deletedData = await posts.findByIdAndDelete(id);
  if (deletedData) {
    new Response(null, "Delete is successfull").success(res);
    await updatePostDataWithSocket();
  }
};
const updatePostDataWithSocket = async () => {
  const topPosts = await getTopPostsSocket();
  global.socket.emit("postData", topPosts);
};
const getTopPostsSocket = async () => {
  const topPosts = await posts
    .find()
    .populate("user", "firstName lastName title")
    .sort({ createdAt: -1 })
    .limit(10);
  return topPosts;
};

module.exports = {
  createUserPost,
  getUserPosts,
  getTopPosts,
  deleteUserPost,
  getTopPostsSocket,
};
