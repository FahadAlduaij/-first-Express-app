const { Mongoose } = require("mongoose");
const { findByIdAndRemove } = require("../../models/Product");
const Product = require("../../models/Product");

// Param MiddleWare
exports.findProduct = async (productId, next) => {
	try {
		const product = await Product.findById(productId);
		return product;
	} catch (error) {
		next(error);
	}
};

// Fetching The Data
exports.fetchProduct = async (req, res, next) => {
	try {
		const products = await Product.find()
			.populate({
				path: "shop",
				select: "name",
			})
			.populate({
				path: "author",
				select: "username",
			});
		return res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

// Delete Product
exports.deleteProduct = async (req, res, next) => {
	try {
		if (!req.user._id.equals(req.product.owner))
			return next({
				status: 401,
				message: "Unauthorized",
			});

		await Product.deleteOne(req.product);
		return res.status(204).end();
	} catch (error) {
		next(error);
	}
};

// Updating Product
exports.updateProduct = async (req, res, next) => {
	try {
		if (!req.user._id.equals(req.product.owner)) {
			return next({
				status: 401,
				message: "Unauthorized",
			});
		}
		const shopId = req.product;
		req.body.shop = shopId;

		const user = req.user._id;
		req.body.owner = user;

		if (req.file) {
			req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
		}

		const updateProduct = await Product.findOneAndUpdate(
			{ _id: req.product._id },
			req.body,
			{ new: true, runValidators: true }
		);
		res.status(200).json(updateProduct);
	} catch (error) {
		next(error);
	}
};
