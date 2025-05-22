const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const extencion = new Schema({
    tipo: {type: String, enum: ['AMPLIATORIA', 'PRORROGA', 'REDETERMINACION', 'CONTINUIDAD']},
    acta: {type: String},
    monto: {type: Number, get: getPrice, set: setPrice, default: 0},
    vencimiento: {type: Date},
    observaciones: {type: String},
}, {timestamps:true})

const orden_compraSchema = new Schema({
    num_orden: {type: String},
    monto: {type: Number, get: getPrice, set: setPrice, default: 0},
    tipo: {type: String},
    destinatario: {type: Schema.Types.ObjectId, ref: 'contractor'},
    origen: {type: String},
    ampliatoria_origen: [{type: Schema.Types.ObjectId, ref: 'extencion'}],
    prorroga_origen: [{type: Schema.Types.ObjectId, ref: 'extencion'}],
    renglon_origen: [{type: Schema.Types.ObjectId, ref: 'extencion'}],
    redeterminacion_origen: [{type: Schema.Types.ObjectId, ref: 'extencion'}],
    continuidad_origen: [{type: Schema.Types.ObjectId, ref: 'extencion'}],
    ampliatoria: [extencion],
    prorroga: [extencion],
    redeterminacion: [extencion],
    continuidad: [extencion],
}, {timestamps:true})

function getPrice(num){
    return (num/100).toFixed(2)
}

function setPrice(num){
    return num*100
}

const orden_compra = mongoose.model('orden_compra', orden_compraSchema);
module.exports = orden_compra;