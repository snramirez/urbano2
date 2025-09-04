const express = require('express');
const router = express.Router();
const licitacion = require('../controllers/licitacion');
const {authRequired, roleCheck} = require('../helpers/authCheck');
const allRoles = ['ADMIN','USER']
const onlyAdmin = ['ADMIN']

/*
    Prefijo de las rutas:
    /api/licitacion
*/

router.get('/',authRequired, roleCheck(allRoles), licitacion.index);
router.get('/:id', authRequired, roleCheck(allRoles), licitacion.search);
router.post('/', authRequired, roleCheck(allRoles), licitacion.create);
router.put('/', authRequired, roleCheck(allRoles), licitacion.edit);
router.delete('/', authRequired, roleCheck(allRoles), licitacion.delete);

module.exports = router;