const express = require("express");
const fs = require("fs");
const router = express.Router();

const cartsFilePath = "./utils/carts.json";
const productsFilePath = "./utils/products.json";

const readCarts = () => {
  const data = fs.readFileSync(cartsFilePath);
  return JSON.parse(data);
};

const writeCarts = (carts) => {
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

const readProducts = () => {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
};

// POST /api/carts/
router.post("/", (req, res) => {
  const carts = readCarts();
  const newCart = { id: `${Date.now()}`, products: [] };
  carts.push(newCart);
  writeCarts(carts);
  res.status(201).json(newCart);
});

// GET /api/carts/:cid
router.get("/:cid", (req, res) => {
  const carts = readCarts();
  const cart = carts.find((c) => c.id === req.params.cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).send("Cart not found");
  }
});

// POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", (req, res) => {
  const carts = readCarts();
  const products = readProducts();
  const cart = carts.find((c) => c.id === req.params.cid);
  const product = products.find((p) => p.id === req.params.pid);

  if (cart && product) {
    const cartProduct = cart.products.find((p) => p.product === req.params.pid);
    if (cartProduct) {
      cartProduct.quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    writeCarts(carts);
    res.json(cart);
  } else {
    res.status(404).send("Cart or Product not found");
  }
});

module.exports = router;
