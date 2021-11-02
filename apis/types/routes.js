const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const {
	fetchType,
	createType,
	createProduct,
	findType,
} = require("./controllers");

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

// Routes
router.get("/", fetchType);
router.post("/", createType);
router.post("/:typeID/products", upload.single("image"), createProduct);

module.exports = router;
