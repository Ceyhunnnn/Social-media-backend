const mongoose = require("mongoose");
// for production
// mongoose
//   .connect(process.env.DATABASE_URI)
//   .then(() => console.log("Database connected"))
//   .catch((error) => console.log("Database connection is Error : ", error));
mongoose
  .connect(process.env.DATABASE_URI_LOCAL, {
    dbName: "socialMedia",
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database connection is Error : ", error));
