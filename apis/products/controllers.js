const { Mongoose } = require("mongoose");
const Product = require("../../db/models/Product");

exports.fetchProduct = async (req, res) => {
	try {
		const products = await Product.find();
		return res.json(products);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

exports.createProduct = async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);
		return res.status(201).json(newProduct);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		foundProduct = await Product.findById(req.params.productId);
		if (foundProduct) {
			await Product.remove(foundProduct);
			return res.status(204).end();
		} else {
			res.status(404).json({ message: "This Product Doesn't Exist" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		foundProduct = await Product.findById(req.params.productId);
		if (foundProduct) {
			const updateProduct = await Product.findOneAndUpdate(
				foundProduct,
				req.body,
				{ new: true }
			);
			return res.status(204).json(updateProduct);
		} else {
			res.status(404).json({ message: "This product doesn't exist" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
