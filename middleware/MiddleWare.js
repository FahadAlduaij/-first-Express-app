// Console Log URL
exports.LogURL = (req, res, next) => {
	console.log(
		`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
	);
	next();
};

// Path Not Found
exports.Logger = (req, res, next) => {
	res.status(404).json({ message: "Path Not Found" });
	next();
};

// Error Handler
exports.ErrorHandler = (err, req, res, next) => {
	res
		.status(err.status || 500)
		.json(err.message || { message: "There is an Internal Server Error!" });
};
