module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();


  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Returns the user with the corresponding email
  router.get("/user_email", controller.one_email);

  // Returns the user with the corresponding key
  router.get("/user", controller.one_key);


  // // Add routes to server.
  app.use("/api/users", router);
};
