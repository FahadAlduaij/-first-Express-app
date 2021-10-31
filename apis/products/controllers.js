const { Mongoose } = require("mongoose");
const { findByIdAndRemove } = require("../../db/models/Product");
const Product = require("../../db/models/Product");

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
		await Product.remove(req.product);
		return res.status(204).end();
	} catch (error) {
		next(error);
	}
};

// Updating Product
exports.updateProduct = async (req, res, next) => {
	try {
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
