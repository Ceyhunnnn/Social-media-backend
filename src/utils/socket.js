const { getTopPostsSocket } = require("../controllers/postsController");
const { Server, Socket } = require("socket.io");
async function setupEvents(io) {
  io.on("connection", async (socket) => {
    const topPosts = await getTopPostsSocket();
    await socket.emit("postData", topPosts);

    socket.on("createPostData", async () => {
      const updatedTopPosts = await getTopPostsSocket();
      await io.emit("createPost", updatedTopPosts);
    });

    socket.on("deletePostData", async () => {
      const updatedTopPosts = await getTopPostsSocket();
      await io.emit("deletedPostData", updatedTopPosts);
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
}

module.exports = { setupEvents };
