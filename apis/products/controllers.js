const { Mongoose } = require("mongoose");
const Product = require("./models/Product");

exports.fetchProduct = async (req, res) => {
	try {
		const products = await Product.find();
		return res.json(products);
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};

exports.createProduct = async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);
		return res.status(201).json(newProduct);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		foundProduct = await Product.findById(req.params.productId);
		if (foundProduct) {
			const removeProduct = await Product.remove(foundProduct);
			return res.status(204).json(removeProduct);
		} else {
			res.status(404).json({ message: "This Product Doesn't Exist" });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		foundProduct = await Product.findById(req.params.productId);
		if (foundProduct) {
			const updateProduct = await Product.findOneAndUpdate(
				foundProduct,
				req.body
			);
			return res.status(204).json(updateProduct);
		} else {
			res.status(404).json({ message: "This product doesn't exist" });
		}
	} catch (error) {
		res.status(500).json({ message: error });
	}
};
