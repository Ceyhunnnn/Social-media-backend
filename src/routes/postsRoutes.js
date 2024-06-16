const router = require("express").Router();

const {
  createUserPost,
  getUserPosts,
  getTopPosts,
  deleteUserPost,
} = require("../controllers/postsController");

router.post("/createUserPost", createUserPost);
router.get("/getUsersPosts/:id", getUserPosts);
router.get("/getTopPosts", getTopPosts);
router.get("/deleteUserPost/:id", deleteUserPost);

module.exports = router;
