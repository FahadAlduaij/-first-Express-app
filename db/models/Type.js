const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

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

typeSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Type", typeSchema);
