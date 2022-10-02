const controller = require("../controllers/post.controller");
module.exports = (express, app) => {
    const controller = require("../controllers/post.controller.js");
    const router = express.Router();

    // Select all posts.
    router.get("/", controller.all);

    // Create a new post.
    router.post("/", controller.create);

    // Add a new comment.
    router.post("/comment", controller.comment);

    // Add a new sub comment.
    router.post("/sub_comment", controller.subComment);

    // Delete a post.
    router.get("/delete", controller.delete);

    // Add routes to server.
    app.use("/api/posts", router);
};
