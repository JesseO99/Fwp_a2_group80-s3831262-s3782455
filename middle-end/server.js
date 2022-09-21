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

// Simple Hello World route.
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
  });

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});