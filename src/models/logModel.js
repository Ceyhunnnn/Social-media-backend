const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    body: {
      type: Object,
    },
    path: {
      type: String,
    },
    method: {
      type: String,
    },
  },
  { collection: "logs", timestamps: true }
);

const logs = mongoose.model("logs", logSchema);
module.exports = logs;
