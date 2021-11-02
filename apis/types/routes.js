const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const {
	fetchType,
	createType,
	createProduct,
	findType,
	deleteType,
} = require("./controllers");

// Param
router.param("shopID", async (req, res, next, shopID) => {
	const type = await findType(shopID, next);
	if (type) {
		req.shop = type;
		next();
	} else {
		next({
			status: 404,
			message: "Type Not Found",
		});
	}
});

// Routes
router.get("/", fetchType);
router.post("/", createType);
router.post("/:shopID/products", upload.single("image"), createProduct);
router.delete("/:shopID", deleteType);

module.exports = router;
