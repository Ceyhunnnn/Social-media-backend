const whiteList = ["http://localhost:3000"];

const corsOptions = (req, callback) => {
  let corsOptions = { origin: false };
  if (whiteList.indexOf(req.header("origin")) !== -1) {
    corsOptions = { origin: true };
  }
  callback(null, corsOptions);
};
module.exports = corsOptions;
