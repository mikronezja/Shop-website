const mongoose = require("mongoose");

// Schema for products in an order
const orderProductSchema = new mongoose.Schema({
  productId: {
    type: Number, // Change to String or ObjectId if needed
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// Main Order schema
const orderSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Default to the current date
  },
  products: {
    type: [orderProductSchema], // Array of orderProductSchema
    required: true,
  },
  total_cost: {
    type: Number,
    required: true,
  },
});

// Creating the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
