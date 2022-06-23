const express = require('express')
const app = express();

app.use(express.json());

const product = require('./Routes/ProductRoute.js')
const user = require('./Routes/UserRoute.js')

app.use('/api', product);
app.use('/api', user);

module.exports = app;
