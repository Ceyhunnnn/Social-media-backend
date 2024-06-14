const user = require("../models/userModel");
const APIError = require("../utils/error");
const Response = require("../utils/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../middlewares/auth");
const register = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await user.findOne({ email });
  if (checkUser) {
    throw new APIError("E-mail already in use", 400);
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const createdUser = new user(req.body);
  await createdUser
    .save()
    .then((data) => new Response(null, "Account created").created(res))
    .catch(() => new APIError("Account could not be created", 400));
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await user.findOne({ email });
  if (!loginUser) {
    throw new APIError("Email or password wrong, please Please try again", 401);
  }
  if (!loginUser.isActive) {
    throw new APIError("user account is deactive", 400);
  }
  const comparePassword = await bcrypt.compare(password, loginUser.password);
  if (!comparePassword) {
    throw new APIError("Email or password wrong, please Please try again", 401);
  }
  createToken(loginUser, res);
};

const userInformations = async (req, res) => {
  return new Response(req.user, "success").success(res);
};

const userProfileUpdate = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await user.findByIdAndUpdate(id, req.body, {
    new: false,
  });
  if (updatedUser) {
    new Response(null, "profile updated!").created(res);
  } else {
    throw new APIError("profile didn't updated, please try again.", 400);
  }
};

module.exports = {
  login,
  register,
  userInformations,
  userProfileUpdate,
};
