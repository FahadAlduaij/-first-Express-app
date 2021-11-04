const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const User = require("../db/models/User");
const { JWT_SECRET } = require("../config/keys");

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
		secretOrKey: JWT_SECRET,
	},
	async (payload, done) => {
		if (Date.now() < payload.exp) {
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
