const jwt = require("jsonwebtoken");
const APIError = require("../utils/error");
const user = require("../models/userModel");

const createToken = async (user, res) => {
  const payload = {
    sub: user._id,
    name: user.name,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return res.status(201).json({
    success: true,
    token,
    message: "Login successfull",
  });
};

const getUserDataWithToken = async (req, res, next) => {
  const headerToken =
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ");
  if (!headerToken) {
    throw new APIError("Invalid Token, please Sign In.", 401);
  }
  const token = req.headers.authorization.split(" ")[1];
  await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) throw new APIError("Invavlid Token", 401);
    const userData = await user
      .findById(decoded.sub)
      .select("firstName lastName email isActive title");
    if (!userData) throw new APIError("Invalid Token");
    req.user = userData;
    next();
  });
};
module.exports = { createToken, getUserDataWithToken };
