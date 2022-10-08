module.exports = (express, app) => {
    const controller = require("../controllers/follow.controller.js");
    const router = express.Router();

    // Select all follow.
    router.get("/", controller.all);

    router.get("/user/all", controller.all_users_follow);

    router.put("/follow", controller.follow);

    router.delete("/unfollow", controller.unfollow);
    // Add routes to server.
    app.use("/api/follows", router);
};
