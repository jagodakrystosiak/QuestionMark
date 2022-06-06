const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();
const auth = require('./middleware/Auth');

const connection = require('./db')
connection()

const app = express();
app.use(bodyParser.json());
app.use(auth);

app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use('/api/user', require('./controllers/User'));
app.use('/api/question', require('./controllers/Question'));
app.use('/api/answer', require('./controllers/Answer'));

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, "..", "client/build/index.html"))
})

app.listen(5000, () => console.log('Server started on port 5000'));