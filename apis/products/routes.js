const express = require("express");
const router = express.Router();

// Functions
const { fetchProduct, createProduct, deleteProduct } = require("./controllers");

// Routes
router.get("/", fetchProduct);

router.post("/", createProduct);

router.delete("/:productId", deleteProduct);

module.exports = router;
