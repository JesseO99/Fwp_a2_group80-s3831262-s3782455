const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// This methed will sync the database in the background
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Add user routes.
require("./src/routes/user.routes.js")(express,app);
require("./src/routes/post.routes.js")(express, app);
require("./src/routes/comment.routes.js")(express,app);
require("./src/routes/sub_comment.routes.js")(express,app);
require("./src/routes/follow.routes.js")(express, app);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});