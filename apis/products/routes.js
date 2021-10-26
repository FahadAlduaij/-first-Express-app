const express = require("express");
const router = express.Router();

// Functions
const {
	fetchProduct,
	createProduct,
	deleteProduct,
	updateProduct,
} = require("./controllers");

// Routes
router.get("/", fetchProduct);

router.post("/", createProduct);

router.delete("/:productId", deleteProduct);

router.put("/:productId", updateProduct);

module.exports = router;
