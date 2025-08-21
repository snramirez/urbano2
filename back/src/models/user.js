const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    cuit: {type: String, required: true},
    fullName: {type: String, required: true},
    role: {type: String, enum:['ADMIN', 'USER']},
    Active:{type: Boolean, default: true}
},
{timestamps: true});

const user = mongoose.model('userSchema', userSchema);
module.exports = user;