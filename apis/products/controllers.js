let products = require("../../data");

exports.fetchProduct = (req, res) => {
	return res.json(products);
};

exports.createProduct = (req, res) => {
	products.push(req.body);
	return res.status(201).json(req.body);
};

exports.deleteProduct = (req, res) => {
	const productId = req.params.productId;
	const product = products.find((product) => product.id === +productId);
	if (product) {
		products = products.filter((product) => product.id !== +productId);
		return res.status(204).end();
	} else {
		return res.status(404).json({ message: "This Product not found" });
	}
};
