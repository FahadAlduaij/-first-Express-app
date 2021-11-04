const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: { type: String, required: true },
	email: String,
	firstName: String,
	lastName: String,
});

module.exports = mongoose.model("User", userSchema);
