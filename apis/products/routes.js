const express = require("express");
const router = express.Router();

// Functions
const {
	fetchProduct,
	createProduct,
	deleteProduct,
	updateProduct,
	findProduct,
} = require("./controllers");

// Param
router.param("productId", async (req, res, next, productId) => {
	const product = await findProduct(productId, next);
	if (product) {
		req.product = product;
		next();
	} else {
		next({
			status: 404,
			message: "Product Not Found",
		});
	}
});

// Routes
router.get("/", fetchProduct);

router.post("/", createProduct);

router.delete("/:productId", deleteProduct);

router.put("/:productId", updateProduct);

module.exports = router;
