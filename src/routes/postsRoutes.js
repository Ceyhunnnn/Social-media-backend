const router = require("express").Router();

const {
  createUserPost,
  getUserPosts,
} = require("../controllers/postsController");

router.post("/createUserPost", createUserPost);
router.get("/getUsersPosts/:id", getUserPosts);

module.exports = router;
