const express = require("express");
const app = express();
const PORT = 8001;
const productsRouter = require("./apis/products/routes");
const connectDB = require("./db/database");

app.use(express.json());

// Console Log URL's with Middleware
app.use((req, res, next) => {
	console.log(
		`${req.method} ${req.protocol}://${req.hostname}:${PORT}${req.originalUrl}`
	);
	next();
});

app.use("/api/products", productsRouter);

connectDB();

app.use((req, res, next) => {
	res.status(404).json({ message: "Path Not Found" });

	next();
});
app.listen(PORT, () => {
	console.log(`This is Port Number ${PORT}`);
});
