const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/oderhist");

// Add a new order
router.post("/", async (req, res) => {
  try {
    const { userid, date, products, total_cost } = req.body;

    console.log("Request body:", req.body);
    if (!userid || !date || !products || products.length === 0 || !total_cost) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newOrder = new Order({
      userid: userid,
      date: new Date(date),
      products: products,
      total_cost: total_cost,
    });
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to add order." });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});


router.get("/:userid", async (req, res) => {
    const userid = req.params.userid;
    try {
      const orders = await Order.find({ userid });
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders for user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


module.exports = router;
