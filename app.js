const connectDB = require("./db/database");
const express = require("express");
const app = express();
const PORT = 8001;
const productsRouter = require("./apis/products/routes");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());

// Console Log URL's with Middleware
app.use((req, res, next) => {
	console.log(
		`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
	);
	next();
});

// Route For Products
app.use("/api/products", productsRouter);
// Creating path for image
app.use("/media", express.static(path.join(__dirname, "media")));

// Handle Path Not Found
app.use((req, res, next) => {
	res.status(404).json({ message: "Path Not Found" });
	next();
});

// Handle Errors
app.use((err, req, res, next) => {
	res
		.status(err.status || 500)
		.json(err.message || { message: "There is an Internal Server Error!" });
});

// Import DB and Listen To Port
connectDB();
app.listen(PORT, () => {
	console.log(`This is Port Number ${PORT}`);
});
