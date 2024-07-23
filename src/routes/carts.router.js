const express = require("express");
const router = express.Router();

const carts = [];
router.post("/", (req, res) => {
  const cart = req.body;
  carts.push(cart);
  res.status(201).json(product);
});

module.exports = router;
