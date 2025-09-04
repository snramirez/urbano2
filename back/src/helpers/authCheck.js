const jwt = require('jsonwebtoken');
const secretKey = 'SecretKey123';

const authRequired  = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No autorizado" });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // { id, role }
        next();
    } 
    catch (error) {
        return res.status(401).json({ msg: "Token inválido" });
    }
};

const roleCheck = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: "Acceso denegado" });
        }
        next();
    };
}

module.exports = {authRequired, roleCheck}