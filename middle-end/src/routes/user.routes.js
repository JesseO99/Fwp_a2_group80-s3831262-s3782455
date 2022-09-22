module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();


  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);



  // // Add routes to server.
  app.use("/api/users", router);
};
