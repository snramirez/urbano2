const ctrl = {};
const User = require('../models/user');
const jwt =  require('jsonwebtoken');
const bcrypt = require('../helpers/bcrypt');
const secretKey = 'SecretKey123';


/* 
    Ejemplo de body para register:
        {
            "user":{
                "userName": "SimonNR",
                "password": "12341234",
                "cuit": "20360772528",
                "fullName": "Simon Ramirez",
                "secretKey": "secretkey"
            }
        }

    Ejemplo de body para login:
        {
            "userName": "SimonNR",  
            "password": "12341234"
        }
*/

ctrl.login = async (req, res) => {
    console.log(req.body);
    const userName = req.body.userName.toLowerCase();
    const password = req.body.password;
    
    try {
        let userDB = await User.findOne({userName: userName}).lean();
        if(!userDB){
            res.status(400).json({error: 'USER_NOT_FOUND'})
            return
        }

        if(!await bcrypt.matchPassword(password, userDB.password)){
            res.status(400).json({error: 'INVALID_PASSWORD'})
            return
        }

        const token = jwt.sign({id: userDB._id, role: userDB.role}, secretKey, {expiresIn: '1d'});
        delete userDB.password
        userDB.token = token
        res.status(200).json(userDB);
    } 
    catch (err) {
        console.log(err)
        res.status(400).json({error: 'DATABASE_ERROR'})
    }
};

ctrl.register = async (req, res) => {
    console.log(req.body)
    let reqUser = req.body.user;    
    let encryptPassword = await bcrypt.encryptPassword(reqUser.password);

    if(!(reqUser.secretKey === 'secretkey')){
        res.status(400).json({title: 'Clave secreta incorrecta'})
        return
    }

    let user = new User({
        userName: reqUser.userName,
        password: encryptPassword,
        cuit: reqUser.cuit,
        fullName: reqUser.fullName,
        role: 'USER'
    });

    try {
        let savedUser = await user.save()
        delete savedUser.password
        res.status(200).json(savedUser);
    } 
    catch (err) {
        console.log(err);
        res.status(400).json({Title: 'Error al registar usuario'});
    }
};

ctrl.profile = async (req, res) => {
    console.log(req.headers);
    try {
        let userDB = await User.findById(req.userId).select('-password').lean();
        if(!userDB){
            res.status(400).json({error: 'USER_NOT_FOUND'})
            return
        }
        res.status(200).json(userDB);
    } 
    catch (err) {
        console.log(err)
        res.status(400).json({error: 'DATABASE_ERROR'})
    }
};

module.exports = ctrl;