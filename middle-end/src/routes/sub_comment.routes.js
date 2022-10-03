module.exports = (express, app) => {
    const controller = require("../controllers/sub_comment.controller.js");
    const router = express.Router();

    router.get("/", controller.all);
    router.delete("/user_id", controller.delete);
    // Add routes to server.
    app.use("/api/sub_comments", router);
}