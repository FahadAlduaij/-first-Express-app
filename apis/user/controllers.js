const { hash } = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../../db/models/User");
const keys = require("../../config/keys");
var jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../../config/keys");

exports.signup = async (req, res, next) => {
	try {
		const saltRounds = 10;
		const hashedPassword = hash(req.body.password, saltRounds);
		req.body.password = hashedPassword;

		const newUser = await User.create(req.body);

		const payload = {
			_id: newUser._id,
			username: newUser.username,
			exp: JWT_EXPIRATION_MS,
		};

		const token = jwt.sign(payload, JWT_SECRET);

		res.status(201).json({ token });
	} catch (error) {
		next({ message: error.message });
	}
};
