const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: { type: String },

		price: {
			type: Number,
			default: 10,
		},
		quantity: {
			type: Number,
			min: 0,
		},

		date: { type: Date, default: Date.now },
		shop: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Type",
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
