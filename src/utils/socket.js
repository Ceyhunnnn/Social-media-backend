const { getTopPostsSocket } = require("../controllers/postsController");
const { Server, Socket } = require("socket.io");
async function setupEvents(io) {
  io.on("connection", async (socket) => {
    socket.on("getPost", async () => {
      const topPosts = await getTopPostsSocket();
      await socket.emit("postData", topPosts);
    });
    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
}

module.exports = { setupEvents };
