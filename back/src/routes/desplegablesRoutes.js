const express = require('express');
const router = express.Router();
const desplegable = require('../controllers/desplegables');

/*
    Prefijo de las rutas:
    /api/contractor
*/

router.get('/', desplegable.index);
router.post('/', desplegable.create);
router.delete('/', desplegable.delete);

module.exports = router;