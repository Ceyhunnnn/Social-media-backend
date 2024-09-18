const logs = require("../models/logModel");

const log = async (req, res, next) => {
  const logData = {
    body: req.body,
    method: req.method,
    path: req.path,
  };
  const createdLog = new logs(logData);
  await createdLog.save();
  next();
};
module.exports = { log };
