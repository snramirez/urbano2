const express = require('express');
const router = express.Router();
const orden_compra = require('../controllers/orden_compra');

/*
    Prefijo de las rutas:
    /api/orden_compra
*/

router.get('/', orden_compra.index);
router.get('/:id', orden_compra.search);
router.post('/', orden_compra.create);
router.put('/', orden_compra.edit);
router.delete('/', orden_compra.delete);

module.exports = router;