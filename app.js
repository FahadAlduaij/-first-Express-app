const express = require("express");
const app = express();
const PORT = 8001;
const connectDB = require("./db/database");

const shopsRouter = require("./apis/types/routes");
const productsRouter = require("./apis/products/routes");
const userRouter = require("./apis/user/routes");
const cors = require("cors");
const path = require("path");
const { Logger, LogURL, ErrorHandler } = require("./middleware/MiddleWare");

//---------------------------------------------------------------//

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/shops", shopsRouter);

// Creating path for image
app.use("/media", express.static(path.join(__dirname, "media")));

app.use(LogURL); // Console Log URL
app.use(Logger); // Path Not Found
app.use(ErrorHandler); // Handle Errors

connectDB(); // Import DB
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
