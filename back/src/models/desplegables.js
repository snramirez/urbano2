const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const desplegableSchema = new Schema(
  {
    tipo: {
      type: String,
      required: true,
      enum: [
        "TIPO_LIC",
        "ESTADO_LIC",
        "TIPO_CONTR",
        "ESTADO_OC",
        "AREA",
        "SUB_AREA",
        "FIRMANTE",
        "MODALIDAD",
        "SUB_MODALIDAD",
      ],
    }, // por ejemplo: 'tipo_licitacion', 'estado_licitacion'
    valor: { type: String, required: true }, // el texto que se muestra al usuario
    Active: { type: Boolean, default: true }, // para permitir bajas sin borrar
  },
  { timestamps: true }
);

module.exports = mongoose.model("desplegable", desplegableSchema);
