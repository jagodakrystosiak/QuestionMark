const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();

const connection = require('./db')
connection()

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use('/api/user', require('./controllers/User'));

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, "..", "client/build/index.html"))
})

app.listen(5000, () => console.log('Server started on port 5000'));