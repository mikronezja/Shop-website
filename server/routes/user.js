const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user')

console.log('Router initialized!');


router.get("/:_id", async (req, res) => {
    const _id = req.params._id
    try {
      const user = await User.findOne( {_id} );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  router.get("/name/:username", async (req, res) => {
    const _id = req.params._id
    try {
      const user = await User.findOne( {username} );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });



router.get('/', async (req, res) => {
    try {
    const users = await User.find();
    res.json(users)
    } catch (err)
    {
        res.status(500).json( {message:err.message} )
    }
});

router.post("/", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username is already taken" });
      }
  
      const newUser = new User({ username: username, password : password });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add user." });
    }
  });

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      res.status(200).json({
        message: "Login successful",
        _id: user._id,
        username: user.username,
        role: user.role,
      });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/admin", async (req, res) => {
    try {
        const { username, password } = req.body;
    
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: "Username is already taken" });
        }
    
        const newUser = new User({ username : username, password : password ,role:"admin" });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add user." });
      }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

  router.delete("/clear", async (req, res) => {
    try {
        console.log("DELETE /clear route hit");
      const result = await User.deleteMany({});
      
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "All users have been deleted." });
      } else {
        res.status(404).json({ message: "No users found to delete." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to clear users." });
    }
  });




module.exports = router;