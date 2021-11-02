const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");

// Import Functions
const {
	fetchProduct,
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
router.delete("/:productId", deleteProduct);
router.put("/:productId", upload.single("image"), updateProduct);


module.exports = router;
