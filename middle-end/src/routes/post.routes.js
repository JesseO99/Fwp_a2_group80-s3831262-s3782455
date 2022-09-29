module.exports = (express, app) => {
    const controller = require("../controllers/post.controller");
    const router = express.Router();


    router.delete("/user_id", controller.delete);
    router.get("/", controller.all);

    // Add routes to server.
    app.use("/api/posts", router);
}