const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractorSchema = new Schema({
    razon_social: {type: String},
    cuit: {type: String, unique: true},
    Type: {type: String},
    Active:{type: Boolean, default: true}
},
{timestamps:true}) 

const contractor = mongoose.model('contractor', contractorSchema);
module.exports = contractor;