module.exports = (express, app) => {
    const controller = require("../controllers/comment.controller");
    const router = express.Router();


    router.get("/", controller.all);
    router.delete("/user_id", controller.delete);
    
    app.use("/api/comment", router);
}