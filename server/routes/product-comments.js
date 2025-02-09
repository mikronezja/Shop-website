const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Comment = require('../models/comments');

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Failed to fetch comments." });
  }
});

// Get comments for a specific product
router.get("/:productid", async (req, res) => {
  const productid = req.params.productid;
  try {
    const productComments = await Comment.find({ productid });
    if (!productComments || productComments.length === 0) {
      return res.status(200).json(null);
    }
    res.status(200).json(productComments);
  } catch (error) {
    console.error("Error fetching comments for product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a specific user's comment on a product
router.get("/:productid/:userid", async (req, res) => {
  const { productid, userid } = req.params;

  try {
    const comment = await Comment.findOne({ productid, userid });

    if (!comment) {
      return res.status(200).json(null);
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching comment for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a comment for a product by a user
router.post("/:productid/:userid", async (req, res) => {
  const { productid, userid } = req.params;
  const { username, rating, body } = req.body;

  try {
    if (rating < 0 || rating > 10 || !Number.isInteger(rating)) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    const existingComment = await Comment.findOne({ productid, userid });
    if (existingComment) {
      return res
        .status(400)
        .json({ message: "User has already commented on this product" });
    }

    const newComment = new Comment({
      userid,
      productid,
      username,
      rating,
      body,
      date: Date.now(),
    });

    await newComment.save();
    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment." });
  }
});

// Delete a specific comment
router.delete("/:productid/:userid", async (req, res) => {
  const { productid, userid } = req.params;
  try {
    const comment = await Comment.findOne({ productid, userid });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Comment.deleteOne({ _id: comment._id });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
});



  router.patch("/:productid/:userid", async (req, res) => {
    const { productid, userid } = req.params;

    const updates = {
      ...req.body, 
      date: Date.now(),
    };
  
    try {
      const comment = await Comment.findOneAndUpdate(
        { productid, userid }, 
        updates, 
        { new: true } 
      );
  
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  module.exports = router;
