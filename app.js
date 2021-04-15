const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/Users');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Routes which should handle requests

var mongoDB =  'mongodb+srv://duythinh:716284@cluster0.dovxc.mongodb.net/duythinh1?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err));

// app.use((req,res,next) => {
    // res.header('Access-Control-Allow-Origin','*');
    // res.header('Access-Control-Allow-Headers',
    //     'Origin, X-Requested-With,Content-Type,Accept,Authorization');
    // if(req.method === "OPTIONS")
    // {
    //     req.header('Access-Control-Allow-Methods','PUT,POST,PATH,DELETE,GET');
    //     res.status(200).json({});
    // }
// })
mongoose.Promise = global.Promise;
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use("/users",userRoutes);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
