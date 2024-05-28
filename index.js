require("express-async-errors");
require("dotenv").config();
require("./src/database/databaseConnection");

const express = require("express");
const app = express();
const router = require("./src/routes");
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");
const errorHandlerMiddleware = require("./src/middlewares/errorMiddleware");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors(corsOptions));
app.use("/api", router);
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
