const mongoose = require("mongoose");
const Type = require("../../db/models/Type");
const Product = require("../../db/models/Product");

// Param MiddleWare
exports.findType = async (typeID, next) => {
	try {
		const type = await Type.findById(typeID);
		return type;
	} catch (error) {
		next(error);
	}
};

exports.fetchType = async (req, res, next) => {
	try {
		const type = await Type.find().populate("product");
		return res.status(200).json(type);
	} catch (error) {
		next(error);
	}
};

exports.createType = async (req, res, next) => {
	try {
		const newType = await Type.create(req.body);
		return res.status(201).json(newType);
	} catch (error) {
		next(error);
	}
};

// Create New Product
exports.createProduct = async (req, res, next) => {
	try {
		const typeID = req.params.typeID;
		req.body.type = typeID;
		if (req.file) {
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
		}
		console.log("req Body", req.body);
		const newProduct = await Product.create(req.body);
		console.log("newProduct", newProduct);
		await Type.findByIdAndUpdate(
			{ _id: typeID },
			{ $push: { product: newProduct._id } }
		);
		return res.status(201).json(newProduct);
	} catch (error) {
		next(error);
	}
};
