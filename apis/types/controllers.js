const mongoose = require("mongoose");
const Type = require("../../models/Type");
const Product = require("../../models/Product");

// Param MiddleWare
exports.findType = async (shopID, next) => {
	try {
		const type = await Type.findById(shopID);
		return type;
	} catch (error) {
		next(error);
	}
};

exports.fetchType = async (req, res, next) => {
	try {
		const type = await Type.find()
			.populate({
				path: "product",
				select: "-shop",
			})
			.populate({
				path: "owner",
				select: "username",
			})
		return res.status(200).json(type);
	} catch (error) {
		next(error);
	}
};

exports.createType = async (req, res, next) => {
	try {
		if (req.file)
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;

		req.body.owner = req.user._id;
		const newType = await Type.create(req.body);
		await newType.populate({
			path: "owner",
			select: "username",
		});
		return res.status(201).json(newType);
	} catch (error) {
		next(error);
	}
};

// Create New Product
exports.createProduct = async (req, res, next) => {
	try {
		if (!req.user._id.equals(req.shop.owner))
			return next({
				status: 401,
				message: "Unauthorized",
			});

		const shopID = req.params.shopID;
		req.body.shop = shopID;

		const user = req.user._id;
		req.body.owner = user;

		if (req.file)
			req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;

		const newProduct = await Product.create(req.body);

		await Type.findByIdAndUpdate(
			{ _id: shopID },
			{ $push: { product: newProduct._id } }
		);

		return res.status(201).json(newProduct);
	} catch (error) {
		next(error);
	}
};

exports.deleteType = async (req, res, next) => {
	try {
		await Type.remove({ _id: req.shop });
		return res.status(204).end();
	} catch (error) {
		next(error);
	}
};
