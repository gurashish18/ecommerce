const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

const product = require('./Routes/ProductRoute.js')
const user = require('./Routes/UserRoute.js')

app.use('/api', product);
app.use('/api', user);

module.exports = app;
