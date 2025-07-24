const ctrl = {};
const Licitacion = require("../models/licitacion");
const OrdenCompra = require("../models/orden_compra");

//Busca todas las licitaciones
ctrl.index = async (req, res) => {
  try {
    let licitacion = await Licitacion.find({ Active: true })
      .populate({
        path: "renglon",
        populate: {
          path: "oferta",
          populate: {
            path: "beneficiario",
          },
        },
      })
      .populate({
        path: "orden_compra",
        populate: {
          path: "destinatario",
        },
      })
      .sort({ num_proceso: "asc" });
    if (licitacion.length === 0) {
      res.status(200).json([{ msj: "lista de licitaciones vacia" }]);
      return;
    }
    res.status(200).json(licitacion);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msj: "error al buscar licitaciones" });
  }
};

ctrl.search = async (req, res) => {
  try {
    let licitacion = await Licitacion.find({
      Active: true,
      _id: req.params.id,
    });
    if (licitacion.length === 0) {
      res.status(200).json([{ msj: "licitacion no encontrada" }]);
      return;
    }
    res.status(200).json(licitacion);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msj: "error al buscar licitacion" });
  }
};

ctrl.create = async (req, res) => {
  console.log(req.body);
  try {
    // Guardar las órdenes primero (si están embebidas en el body)
    const ordenesGuardadas = await OrdenCompra.insertMany(
      req.body.orden_compra || []
    );

    // Reemplazar orden_compra con los _id recién creados
    const ordenIds = ordenesGuardadas.map((oc) => oc._id);

    let savedLicitacion = await Licitacion.create({
      ...req.body,
      orden_compra: ordenIds,
    });

    //para que devuelva la licitación completa con las órdenes y sus destinatarios populados
    savedLicitacion = await Licitacion
      .findById(savedLicitacion._id)
      .populate({
        path: "renglon",
        populate: {
          path: "oferta",
          populate: {
            path: "beneficiario",
          },
        },
      })
      .populate({
        path: "orden_compra",
        populate: {
          path: "destinatario",
        },
      });
    res.status(200).json(savedLicitacion);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msj: "error al guardar licitacion" });
  }
};

ctrl.edit = async (req, res) => {
  console.log(req.body);
  try {
    // Guardar las órdenes primero (si están embebidas en el body)
    const ordenesRecibidas = req.body.licitacion.orden_compra || [];

    // 1. Obtener los IDs actuales en la base de datos
    const licitacionActual = await Licitacion.findById(req.query.id).populate(
      "orden_compra"
    );
    const ordenesActuales = licitacionActual.orden_compra || [];
    const ordenesActualesIds = ordenesActuales.map((oc) => oc._id);
    const ordenesRecibidasIds = ordenesRecibidas.map((oc) => oc._id);

    // 2. Marcar como inactivas las que estaban antes y no llegaron ahora
    const ordenesParaDesactivar = ordenesActualesIds.filter(
      (id) => !ordenesRecibidasIds.includes(id)
    );
    await OrdenCompra.updateMany(
      { _id: { $in: ordenesParaDesactivar } },
      { $set: { Active: false } }
    );

    // Guarda los id de las ordenes actualizadas o creadas
    const ordenesFinalIds = [];

    for (oc of ordenesRecibidas) {
      if (oc._id) {
        // Si ya tiene _id → actualizar la orden existente
        await OrdenCompra.findByIdAndUpdate(oc._id, oc, { new: true });
        ordenesFinalIds.push(oc._id);
      } else {
        // Si no tiene _id → crear nueva orden
        const nueva = await OrdenCompra.create(oc);
        ordenesFinalIds.push(nueva._id);
      }
    }

    let savedLicitacion = await Licitacion.findByIdAndUpdate(
      req.query.id,
      { ...req.body.licitacion, orden_compra: ordenesFinalIds },
      { new: true }
    )
      .populate({
        path: "renglon",
        populate: {
          path: "oferta",
          populate: {
            path: "beneficiario",
          },
        },
      })
      .populate({
        path: "orden_compra",
        populate: {
          path: "destinatario",
        },
      })
      .exec();
    console.log('editada', savedLicitacion)
    res.status(200).json(savedLicitacion);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msj: "error al editar la licitacion" });
  }
};

ctrl.delete = async (req, res) => {
  console.log(req.body);
  try {
    let savedLicitacion = await Licitacion.findByIdAndUpdate(
      req.query.id,
      { Active: false },
      { new: true }
    ).exec();
    res.status(200).json(savedLicitacion);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msj: "error al eliminar licitacion" });
  }
};

module.exports = ctrl;
