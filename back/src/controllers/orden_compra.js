const ctrl = {}
const OrdenCompra = require('../models/orden_compra');

ctrl.index = async (req, res) => {
    try {
        let ordenCompra = await OrdenCompra.find({ Active: true }).populate('destinatario').sort({ num_orden: 'asc' });
        if (ordenCompra.length === 0) {
            res.status(200).json([{ msj: 'lista de ordenes de compra vacia' }])
            return
        }
        res.status(200).json(ordenCompra);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msj: 'error al buscar ordenes de compra' })
    }
};

ctrl.search = async (req, res) => {
    try {
        let ordenCompra = await OrdenCompra.find({ Active: true, _id: req.params.id }).populate('destinatario');
        if (ordenCompra.length === 0) {
            res.status(200).json([{ msj: 'orden de compra no encontrada' }])
            return
        }
        res.status(200).json(ordenCompra);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msj: 'error al buscar orden de compra' })
    }
};

ctrl.create = async (req, res) => {
    try {
        let savedOrdenCompra = await new OrdenCompra(req.body).save();
        res.status(200).json(savedOrdenCompra)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ msj: 'error al guardar orden de compra' })
    }
};


ctrl.edit = async (req, res) => {
    try {
        let savedOrdenCompra = await OrdenCompra.findByIdAndUpdate(req.query.id, req.body, { new: true }).exec()
        res.status(200).json(savedOrdenCompra)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ msj: 'error al editar orden de compra' })
    }
};

ctrl.delete = async (req, res) => {
    try {
        let savedOrdenCompra = await OrdenCompra.findByIdAndUpdate(req.query.id, { Active: false }, { new: true }).exec()
        res.status(200).json(savedOrdenCompra)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ msj: 'error al eliminar orden de compra' })
    }
};

module.exports = ctrl;