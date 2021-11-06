const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
require("dotenv").config();

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		const user = await User.findOne({ username: username });
		const passwordMatch = user
			? await bcrypt.compare(password, user.password)
			: false;

		if (passwordMatch) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	} catch (error) {
		return done(error);
	}
});

exports.jwtStrategy = new JWTStrategy(
	{
		jwtFromRequest: fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	},
	async (payload, done) => {
		// Using expiresIn when Generate a Token
		// It returns the time in seconds not milliSeconds.
		// So when you're comparing to Date.now() which gives the time in ms,
		// So you either divide Date.now() by 1000 or multiply exp by 1000.

		const exp = payload.exp * 1000;
		if (Date.now() > exp) {
			return done(null, false);
		}
		try {
			const user = await User.findOne({ _id: payload._id });
			return done(null, user);
		} catch (error) {
			done(error);
		}
	}
);
