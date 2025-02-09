const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mongoose Connection Setup
mongoose
  .connect(process.env.ATLAS_URL, {
    autoIndex: true
  })
  .then(() => {
    console.log("Connected to MongoDB using Mongoose!");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  });

// Define Mongoose Schema and Model (example for `User`)
// const User = mongoose.model("User", userSchema);
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
  
// Routers
const userRouter = require("./routes/user"); // Define this to use `User` model
app.use("/user", userRouter);

const commentRouter = require("./routes/product-comments"); // Define this to use `User` model
app.use("/product-comments", commentRouter);

const orderhistRouter = require("./routes/orders"); // Define this to use `User` model
app.use("/orderhist", orderhistRouter);


console.log("User router mounted at /user");

// Start Server
app.listen(5000, () => console.log("Server started on port 5000"));
