const router = require("express").Router();

const { getSuggesstedFriends } = require("../controllers/usersController");
const { getUserDataWithToken } = require("../middlewares/auth");

router.get("/getSuggesstedFriends", getUserDataWithToken, getSuggesstedFriends);

module.exports = router;
