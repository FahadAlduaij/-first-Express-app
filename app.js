const express = require("express");
const products = require("./data");

const app = express();

app.use(express.json());

app.get("/api/products.", (req, res) => {
	return res.json(products);
});

app.post("/api/products", (req, res) => {
	products.push(req.body);
	res.status(201);
	return res.json(req.body);
});

app.delete("api/products/:productId", (req, res) => {
	const productId = req.params.productId;
	const product = products.find((product) => product.id === +productId);
	if (product) {
		products = products.filter((product) => product.id !== +productId);
		return res.status(204).end;
	} else {
		return res.status(404).json({ message: "Product not fount" });
	}
});

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`This is Port Number ${PORT}`);
});
