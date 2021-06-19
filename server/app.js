const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(cookieParser());
var expressSession = require('express-session');
app.use(expressSession({secret: 'secretkey', saveUninitialized: true, resave: false}));
dotenv.config({path:'./config.env'})
require('./db/conn')

app.use(express.json());
const User = require('./model/userSchema');

app.use(require('./router/auth'))

const port = process.env.port

app.listen(port,()=>{
    console.log('server is running')
})