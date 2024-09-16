const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database connection is Error : ", error));
