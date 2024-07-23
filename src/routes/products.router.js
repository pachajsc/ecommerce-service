const express = require("express");
const router = express.Router()

const products = [];
router.post("/", (req, res) => {
  const product = req.body;
  products.push(product);
  res.status(201).json(product);
});

router.get("/", (req, res) => {
  res.send(products);
});


module.exports = router;