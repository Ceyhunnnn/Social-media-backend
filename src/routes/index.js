const router = require("express").Router();

const auth = require("./authRoutes");
const posts = require("./postsRoutes");
const users = require("./userRoutes");

router.use(auth);
router.use(posts);
router.use(users);

module.exports = router;
