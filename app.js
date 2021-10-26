const express = require("express");
const app = express();
const PORT = 8001;
const productsRouter = require("./apis/products/routes");
const connectDB = require("./db/database");

app.use(express.json());
app.use("/api/products", productsRouter);

connectDB();

app.listen(PORT, () => {
	console.log(`This is Port Number ${PORT}`);
});
