const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {type: String, required: true}
})

export default mongoose.model("Patient", patientSchema)