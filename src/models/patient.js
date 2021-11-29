const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    cpf: {type: String, required: true}, 
    email: {type:String, required: true},
    dx: {type: String, required: true},
    phone: {type: String, required: true}, 
    weight: {type: Number},
    height: {type: Number},
    gender: {type: String, required:true},
    allergies: {type: Array, required: true},
    meds: {type: Array, required:true}
})

module.exports = mongoose.model("Patient", patientSchema)