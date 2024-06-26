const router = require("express").Router();

const { getAllUsers } = require("../controllers/usersController");

router.get("/getAllUsers", getAllUsers);

module.exports = router;
