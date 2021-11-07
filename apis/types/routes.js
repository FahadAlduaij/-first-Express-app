const express = require("express");
const passport = require("passport");
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
			message: "Shop Not Found",
		});
	}
});

// Routes
router.get("/", fetchType);
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	upload.single("image"),
	createType
);
router.post(
	"/:shopID/products",
	passport.authenticate("jwt", { session: false }),
	upload.single("image"),
	createProduct
);
router.delete(
	"/:shopID",
	passport.authenticate("jwt", { session: false }),
	deleteType
);

module.exports = router;
