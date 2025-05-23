const express = require('express');
const router = express.Router();
const home = require('../controllers/home.js');
const authRoutes = require('./authRoutes');
const contractor = require('../routes/contractorRoutes');
const licitacion = require('../routes/licitacionRoutes.js');
const ordenCompra = require('../routes/ordenCompraRoutes.js');



module.exports = app => {
    router.get('/', home.index);
    app.use('/api/auth', authRoutes);
    app.use('/api/contractor', contractor);
    app.use('/api/licitacion', licitacion);
    app.use('/api/orden_compra', ordenCompra);
    app.use(router);
}