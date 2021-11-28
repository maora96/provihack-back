const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cpf: {type: String, required: true},
    crm : {type: String, required: true},
    email: {type: String, required: true},
    specialty: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model("Profissional", professionalSchema);