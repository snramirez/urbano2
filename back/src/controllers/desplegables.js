const ctrl = {}
const Desplegables = require('../models/desplegables');


//busca todos los desplegables, tiene que recibir el tipo de desplegable como query
ctrl.index = async (req, res) => {
    try {
        let desplegables = await Desplegables.find({tipo: req.query.tipo, Active: true}).sort({tipo: 'asc'});
        if(desplegables.length === 0){
            res.status(200).json([{msj: 'lista de desplegables vacia'}])
            return
        }
        res.status(200).json(desplegables);
    } catch (error) {
        console.log(error);
        res.status(400).json({msj: 'error al buscar desplegables'})
    }
}

ctrl.create = async (req, res) => {
    console.log(req.body)
    try {
        let savedDesplegable = await new Desplegables(req.body).save();
        res.status(200).json(savedDesplegable)
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({msj: 'error al guardar desplegable'})    
    }
}

ctrl.delete = async (req, res) => {
    try {
        let savedDesplegable = await Desplegables.findByIdAndUpdate(req.query.id, {Active: false}, {new: true}).exec()    
        res.status(200).json(savedDesplegable)
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({msj: 'error al eliminar desplegable'}) 
    }
}

module.exports = ctrl