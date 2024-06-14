const router = require("express").Router();
const {
  register,
  login,
  userInformations,
  userProfileUpdate,
} = require("./../controllers/authControllers");
const { getUserDataWithToken } = require("../middlewares/auth");
router.post("/login", login);
router.post("/register", register);
router.get("/userInformations", getUserDataWithToken, userInformations);
router.post("/userProfileUpdate/:id", userProfileUpdate);

module.exports = router;
