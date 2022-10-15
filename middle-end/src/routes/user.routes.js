const controller = require("../controllers/user.controller");
module.exports = (express, app) => {

  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);


  // Returns the user with the corresponding email
  router.get("/user_email", controller.one_email);

  // Returns the user with the corresponding key
  router.get("/user", controller.one_key);


  // Select a user by email.
  router.get("/search/:email", controller.findUser);

  // Calls the delete method which will delete the user's specified by the user_id paramater.
  router.delete("/user", controller.delete);

  // Calls the update method which updates the first_name, last_name and email
  router.put("/user/update", controller.update);

  router.get("/following", controller.all_following);

  // Add routes to server.
  app.use("/api/users", router);
  
};
