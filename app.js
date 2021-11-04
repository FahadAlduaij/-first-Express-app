const express = require("express");
const app = express();
const PORT = 8001;
const connectDB = require("./db/database");

const shopsRouter = require("./apis/types/routes");
const productsRouter = require("./apis/products/routes");
const userRouter = require("./apis/user/routes");
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("./middleware/passport");
const path = require("path");
const { Logger, LogURL, ErrorHandler } = require("./middleware/MiddleWare");

//---------------------------------------------------------------//

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/shops", shopsRouter);
app.use("/api", userRouter);

// Creating path for Files
app.use("/media", express.static(path.join(__dirname, "media")));

// MiddleWares
app.use(passport.initialize()); // Calling passport
passport.use("local", localStrategy);
app.use(LogURL); // Console Log URL
app.use(Logger); // Path Not Found
app.use(ErrorHandler); // Handle Errors

connectDB(); // Import DB
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
