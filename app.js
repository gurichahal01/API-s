const express = require('express');
const app = express();
// const mongoose = require('mongoose')
const connection = require('./database/db')

const UserRouter = require('./routes/user_route')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

console.log('test', 'app.js')
app.use('/user', UserRouter);

const port = 6000;
app.listen(port, console.log('server is running at port:6000'))