const { Mongoose } = require("mongoose");
const { findByIdAndRemove } = require("../../db/models/Product");
const Product = require("../../db/models/Product");

// Fetching The Data
exports.fetchProduct = async (req, res, next) => {
	try {
		const products = await Product.find();
		return res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

// Create New Product
exports.createProduct = async (req, res, next) => {
	try {
		const newProduct = await Product.create(req.body);
		return res.status(201).json(newProduct);
	} catch (error) {
		next(error);
	}
};

// Delete Product
exports.deleteProduct = async (req, res, next) => {
	try {
		foundProduct = await Product.findById(req.params.productId);
		if (foundProduct) {
			await Product.remove(foundProduct);
			return res.status(204).end();
		} else {
			next({
				status: 404,
				message: "Product Not Found",
			});
		}
	} catch (error) {
		next(error);
	}
};

// Updating Product
exports.updateProduct = async (req, res, next) => {
	const productId = req.params.productId;

	try {
		const updateProduct = await Product.findOneAndUpdate(
			{ _id: productId },
			req.body,
			{ new: true, runValidators: true }
		);
		if (updateProduct) {
			return res.status(200).json(updateProduct);
		} else {
			next({
				status: 404,
				message: "Product Not Found",
			});
		}
	} catch (error) {
		next(error);
	}
};
