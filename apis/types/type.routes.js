const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const Product = require("../../db/models/Product");
const {
	fetchType,
	createType,
	createProduct,
	findType,
} = require("./type.controllers");

router.get("/", fetchType);
router.post("/", createType);
router.post("/:typeID/products", upload.single("image"), createProduct);

// Param
router.param("typeID", async (req, res, next, typeID) => {
	const type = await findType(typeID, next);
	if (type) {
		req.type = type;
		next();
	} else {
		next({
			status: 404,
			message: "Type Not Found",
		});
	}
});

module.exports = router;
