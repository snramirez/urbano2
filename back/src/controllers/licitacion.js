const ctrl = {}
const Licitacion = require('../models/licitacion');
const orden_compra = require('../models/orden_compra');
const OrdenCompra = require('../models/orden_compra');

//Busca todas las licitaciones
ctrl.index = async (req, res) => {
    try {
        let licitacion = await Licitacion.find({ Active: true }).sort({ num_proceso: 'asc' });
        if (licitacion.length === 0) {
            res.status(200).json([{ msj: 'lista de licitaciones vacia' }])
            return
        }
        res.status(200).json(licitacion);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msj: 'error al buscar licitaciones' })
    }
};

ctrl.search = async (req, res) => {
    try {
        let licitacion = await Licitacion.find({ Active: true, _id: req.params.id });
        if (licitacion.length === 0) {
            res.status(200).json([{ msj: 'licitacion no encontrada' }])
            return
        }
        res.status(200).json(licitacion);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msj: 'error al buscar licitacion' })
    }
};

ctrl.create = async (req, res) => {
    console.log(req.body)
    try {

        // Guardar las órdenes primero (si están embebidas en el body)
        const ordenesGuardadas = await OrdenCompra.insertMany(req.body.orden_compra || []);
        console.log(ordenesGuardadas)

        // Reemplazar orden_compra con los _id recién creados
        const ordenIds = ordenesGuardadas.map(oc => oc._id);
        console.log(ordenIds)


        let savedLicitacion = await new Licitacion({...req.body, orden_compra: ordenIds}).save();
        res.status(200).json(savedLicitacion)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ msj: 'error al guardar licitacion' })
    }
};


ctrl.edit = async (req, res) => {
    console.log(req.body)
    try {
        let savedLicitacion = await Licitacion.findByIdAndUpdate(req.query.id, req.body.data, { new: true }).exec()
        res.status(200).json(savedLicitacion)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ msj: 'error al editar contratista' })
    }
};

ctrl.delete = async (req, res) => {
    console.log(req.body)
    try {
        let savedLicitacion = await Licitacion.findByIdAndUpdate(req.query.id, { Active: false }, { new: true }).exec()
        res.status(200).json(savedLicitacion)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ msj: 'error al eliminar contratista' })
    }
};

module.exports = ctrl;