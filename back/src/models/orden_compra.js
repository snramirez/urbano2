const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const control = new Schema({
    num_certificado: {type: String},
    periodo: {type: Date},
    SPR: {type: String},
    PRD: {type: String},
    monto_ejecutado: {type: Number, get: getPrice, set: setPrice, default: 0},
    monto_pagado: {type: Number, get: getPrice, set: setPrice, default: 0},
    estado: {type: String, enum: ['PAGADO', 'DEVENGADO', 'NO DEVENGADO']},
}, {timestamps:true})

const extencion = new Schema({
    tipo: {type: String, enum: ['AMPLIATORIA', 'PRORROGA', 'REDETERMINACION', 'CONTINUIDAD']},
    acta: {type: String},
    monto: {type: Number, get: getPrice, set: setPrice, default: 0},
    fecha: {type: Date},
    observaciones: {type: String},
}, {timestamps:true})

const orden_compraSchema = new Schema({
    num_orden: {type: String},
    monto: {type: Number, get: getPrice, set: setPrice, default: 0},
    tipo: {type: String},
    destinatario: [{type: Schema.Types.ObjectId, ref: 'contractor'}],
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
    control: [control],
    Active: {type: Boolean, default: true},
}, {timestamps:true})


orden_compraSchema.set('toObject', { getters: true });
extencion.set('toObject', { getters: true });
orden_compraSchema.set('toJSON', { getters: true });
extencion.set('toJSON', { getters: true });


function getPrice(num){
    return (num/100)
}

function setPrice(num){
    return num*100
}

const orden_compra = mongoose.model('orden_compra', orden_compraSchema);
module.exports = orden_compra;