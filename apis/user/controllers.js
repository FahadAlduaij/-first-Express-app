const { hash } = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../../db/models/User");
const keys = require("../../config/keys");
var jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../../config/keys");

const generateToken = (user) => {
	const payload = {
		_id: user._id,
		username: user.username,
	};

	return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

exports.signup = async (req, res, next) => {
	try {
		const saltRounds = 10;
		const hashedPassword = await hash(req.body.password, saltRounds);
		req.body.password = hashedPassword;

		const newUser = await User.create(req.body);

		const token = generateToken(newUser);

		res.status(201).json({ token });
	} catch (error) {
		next({ message: error.message });
	}
};

exports.signin = (req, res) => {
	const token = generateToken(req.user);
	return res.json({ token });
};
