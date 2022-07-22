const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileupload());

const product = require("./Routes/ProductRoute.js");
const user = require("./Routes/UserRoute.js");
const order = require("./Routes/OrderRoute.js");
const payment = require("./Routes/PaymentRoute.js");

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payment);

module.exports = app;
