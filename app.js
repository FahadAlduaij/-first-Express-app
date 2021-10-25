const express = require("express");
const productsRouter = require("./apis/products/routes");
const app = express();

app.use(express.json());
app.use("/api/products", productsRouter);

const PORT = 8001;
app.listen(PORT, () => {
	console.log(`This is Port Number ${PORT}`);
});
