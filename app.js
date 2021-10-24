const express = require("express");
const products = require("./data");

const app = express();

const PORT = 8000;

app.listen(PORT, () => {
	console.log(`This is Port Number ${PORT}`);
});

app.get("/api/products.", (req , res) => {
    res.json(products)
})
