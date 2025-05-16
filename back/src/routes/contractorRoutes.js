const express = require('express');
const router = express.Router();
const contractor = require('../controllers/contractor');

/*
    Prefijo de las rutas:
    /api/contractor
*/

router.get('/', contractor.index);
router.get('/:id', contractor.search);
router.post('/', contractor.create);
router.put('/', contractor.edit);
router.delete('/', contractor.delete);

module.exports = router;