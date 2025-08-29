const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

/*
    Prefijo de las rutas:
    /api/auth
*/

router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/profile', auth.profile);


//TODO changepassword

module.exports = router;