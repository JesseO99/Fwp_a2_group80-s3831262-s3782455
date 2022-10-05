module.exports = (express, app) => {
    const controller = require("../controllers/follow.controller.js");
    const router = express.Router();

    // Select all follow.
    router.get("/", controller.all);

    router.get("/user/all", controller.following_all);

    router.put("/follow", controller.follow);
    // Add routes to server.
    app.use("/api/follows", router);
};
