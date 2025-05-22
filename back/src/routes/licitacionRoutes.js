const express = require('express');
const router = express.Router();
const licitacion = require('../controllers/licitacion');

/*
    Prefijo de las rutas:
    /api/licitacion
*/

router.get('/', licitacion.index);
router.get('/:id', licitacion.search);
router.post('/', licitacion.create);
router.put('/', licitacion.edit);
router.delete('/', licitacion.delete);

module.exports = router;