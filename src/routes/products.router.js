const express = require("express");
const fs = require("fs");
const router = express.Router();

const productsFilePath = "./utils/products.json";

const readProducts = () => {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

const validateProduct = (product) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = product;
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !status ||
    !stock ||
    !category ||
    !thumbnails ||
    thumbnails.length < 1
  ) {
    return false;
  }
  return true;
};

// GET
router.get("/", (req, res) => {
  const products = readProducts();
  if (!products.length) {
    res.status(400).json({
      message: "data empty",
    });
  } 
  res.json(products);
});

// GET single product
router.get("/:pid", (req, res) => {
  const products = readProducts();
  const product = products.find((p) => p.id === req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

// POST
router.post("/", (req, res) => {
   const products = readProducts();
   const newProduct = { id: `${Date.now()}`, ...req.body };

   if (!validateProduct(newProduct)) {
     return res.status(400).send("Invalid product data");
   }

   products.push(newProduct);
   writeProducts(products);
   res.status(201).json(newProduct);
});


// PUT /api/products/:pid
router.put('/:pid', (req, res) => {
    const products = readProducts();
    const index = products.findIndex(p => p.id === req.params.pid);
    if (index !== -1) {
        const updatedProduct = { ...req.body, id: products[index].id };

        if (!validateProduct(updatedProduct)) {
            return res.status(400).send('Invalid product data');
        }

        products[index] = updatedProduct;
        writeProducts(products);
        res.json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
});

// DELETE
router.delete("/:pid", (req, res) => {
  let products = readProducts();
  const index = products.findIndex((p) => p.id === req.params.pid);
  console.log('index',index);
  if (index !== -1) {
    products = products.filter((p) => p.id !== req.params.pid);
    writeProducts(products);
    res.status(204).send("Product deleted");
  } else {
    res.status(404).send("Product not found");
  }
});

module.exports = router;
