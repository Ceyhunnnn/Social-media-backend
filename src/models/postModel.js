const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const postSchema = new mongoose.Schema(
  {
    userId: { type: objectId, ref: "users" },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },

  { collection: "posts", timestamps: true }
);

const posts = mongoose.model("posts", postSchema);
module.exports = posts;
