
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = process.env.MONGODB_URI;

const connection = mongoose.connect(connectionString);

connection
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

module.exports = connection;
