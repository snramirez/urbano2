const morgan = require('morgan');
const express = require('express');
const routes = require('./routes/index');
const cors = require('cors')
require('dotenv').config()

module.exports = app => {
   
    //settings
    app.set('port', process.env.PORT || 3000);

    //Middlewares
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cors());

    //Routes
    routes(app);
    
    return app;
}