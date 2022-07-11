const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileupload());

const product = require("./Routes/ProductRoute.js");
const user = require("./Routes/UserRoute.js");
const order = require("./Routes/OrderRoute.js");

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);

module.exports = app;
