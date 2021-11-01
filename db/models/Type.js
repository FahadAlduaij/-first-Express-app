const mongoose = require("mongoose");

const typeSchema = mongoose.Schema(
	{
		name: String,
		image: String,
		product: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Type", typeSchema);
