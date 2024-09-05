const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const postSchema = new mongoose.Schema(
  {
    user: { type: objectId, ref: "users" },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },

  { collection: "posts", timestamps: true }
);

const posts = mongoose.model("posts", postSchema);
module.exports = posts;
