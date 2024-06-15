const router = require("express").Router();

const auth = require("./authRoutes");
const posts = require("./postsRoutes");

router.use(auth);
router.use(posts);

module.exports = router;
