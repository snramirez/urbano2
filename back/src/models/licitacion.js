const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ofertaSchema = new Schema({
    monto_oferta: {type: Number, get: getPrice, set: setPrice, default: 0},
    observaciones: {type: String},
    ganador: {type: Boolean, default: false},
    doc_legal: {type: Boolean, default: false},
    doc_economica: {type: Boolean, default: false},
    doc_tecnica: {type: Boolean, default: false},
    fecha_oferta: {type: Date},
    beneficiario: [{type:Schema.Types.ObjectId, ref: 'contractor'}],
})

const renglonSchema = new Schema({
    descripcion: {type: String},
    monto: {type: Number, get: getPrice, set: setPrice, default: 0},
    oferta: [ofertaSchema],
})

const licitacionSchema = new Schema({
    nombre: {type: String},
    num_proceso: {type: String},
    expediente: {type: String},
    area: {type: String},
    subarea: {type: String},
    firmante: {type: String},
    modalidad: {type: String},
    submodalidad: {type: String},
    tipo_contrato: {type: String},
    estado: {type: String},
    plazo: {type: String},
    inicio: {type: Date},
    vencimiento: {type: Date},
    monto: {type: Number, get: getPrice, set: setPrice, default: 0},
    pliego_ingreso: {type: Date},
    pliego_egreso: {type: Date},
    salida_pg1: {type: Date},
    vuelta_pg1: {type: Date},
    fecha_llamado: {type: Date},
    acta_llamado: {type: String},
    apertura_ofertas: {type: Date},
    fecha_vencimiento_plazo_impugnacion: {type: Date},
    fecha_vencimiento_doc: {type: Date},
    salida_pg2: {type: Date},
    vuelta_pg2: {type: Date},
    fecha_adjudicacion: {type: Date},
    acta_adjudicacion: {type: Date},
    renglon: [renglonSchema],
    orden_compra:[{type:Schema.Types.ObjectId, ref: 'orden_compra'}],
    Active:{type: Boolean, default: true}
},
{timestamps:true})

licitacionSchema.set('toJSON', { getters: true });
ofertaSchema.set('toJSON', { getters: true });

licitacionSchema.set('toObject', { getters: true });
ofertaSchema.set('toObject', { getters: true });

function getPrice(num){
    return (num/100)
}

function setPrice(num){
    return num*100
}

const licitacion = mongoose.model('licitacion', licitacionSchema);
module.exports = licitacion;