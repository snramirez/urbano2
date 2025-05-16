const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orden_compraSchema = new Schema({
    num_orden: {type: String},
    monto: {type: Number, get: getPrice, set: setPrice, default: 0},
    tipo: {type: String},
    destinatario: {type: Schema.Types.ObjectId, ref: 'contractor'},
    origen: {type: String},
    ampliatoria_origen: {type: Schema.Types.ObjectId, ref: 'ampliatoria'},
    prorroga_origen: {type: Schema.Types.ObjectId, ref: 'prorroga'},
    renglon_origen: {type: Schema.Types.ObjectId, ref: 'renglon'},
    
}, {timestamps:true})

function getPrice(num){
    return (num/100).toFixed(2)
}

function setPrice(num){
    return num*100
}

const orden_compra = mongoose.model('orden_compra', orden_compraSchema);
module.exports = orden_compra;