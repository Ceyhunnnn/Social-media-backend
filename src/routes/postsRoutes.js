const router = require("express").Router();

const {
  createUserPost,
  getUserPosts,
  getTopPosts,
} = require("../controllers/postsController");

router.post("/createUserPost", createUserPost);
router.get("/getUsersPosts/:id", getUserPosts);
router.get("/getTopPosts", getTopPosts);

module.exports = router;
