const user = require("../models/userModel");
const APIError = require("../utils/error");
const Response = require("../utils/response");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await user
      .find({})
      .select("_id firstName lastName title")
      .limit(4);
    if (allUsers.length > 0) {
      new Response(allUsers, "Success").success(res);
    }
  } catch (error) {
    throw new APIError("Users not found", 400);
  }
};

module.exports = { getAllUsers };
