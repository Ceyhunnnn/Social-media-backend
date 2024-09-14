require("express-async-errors");
require("dotenv").config();
require("./src/database/databaseConnection");
const express = require("express");
const app = express();
const router = require("./src/routes");
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");
const errorHandlerMiddleware = require("./src/middlewares/errorMiddleware");
const { Server } = require("socket.io");
const http = require("http");
const { setupEvents } = require("./src/utils/socket");

const server = http.createServer(app);
const socket = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
global.socket = socket;

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors(corsOptions));
app.use("/api", router);
app.use(errorHandlerMiddleware);

setupEvents(socket);
server.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running in port ${process.env.PORT}`);
});
