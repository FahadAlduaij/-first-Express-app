const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		price: {
			type: Number,
			default: 10,
		},
		quantity: {
			type: Number,
			min: 0,
		},

		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
