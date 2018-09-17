'use strict';

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Import routers
import bootRouter from './routes/bot.route.js';
import productRouter from './routes/product.route';
import saleRouter from './routes/sale.route';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Headers configurations
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Expose routers
app.use('/bots', bootRouter);
app.use('/product', productRouter);
app.use('/sale', saleRouter);

export default app;