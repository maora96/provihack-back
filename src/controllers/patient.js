const mongoose = require('mongoose')
const Patient = require('../models/patient')
const jwt = require('jsonwebtoken');
const Password = require('../utils/password')


const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingPatient = await Patient.findOne({ email });
        if (!existingPatient) {
            return res.status(404).json( {message: "Paciente não existe."});
        }

        const isPasswordCorrect = Password.check(password, existingPatient.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Credenciais inválidos."});
        }

        const token = jwt.sign(
            { email: existingPatient.email, id: existingPatient._id, role: 'patient'},
            "provihack",
            { expiresIn: '1h'}
        );

        res.status(200).json({ existingPatient, token});
    } catch (error) {
        res.status(500).json( { message: error.message});
    }
}


const addPatient = async (req, res) => {
    const { email, name, surname, password, cpf, dx, phone, weight, height, gender, allergies, meds } = req.body;
    
    // check if email is already being used
    const existingUser = await Patient.findOne( {email} )

    if (existingUser) {
        return res.status(404).json({ message: "E-mail já cadastrado."})
    }

    // encrypt password

    const hashedPassword = await Password.encrypt(password)

    // add new patient
    const newPatient = new Patient({
        name, surname, email, password: hashedPassword, cpf, dx, phone, weight, height, gender, allergies, meds
    })

    try {
        await newPatient.save();
        
        const token = jwt.sign(
            { email: newPatient.email, id: newPatient._id},
            "provihack",
            { expiresIn: '1h'}
        )

        res.status(201).json({newPatient, token})
    } catch(error) {
        res.status(409).json({message: error.message})
    }


}

const getPatientById = async (req, res) => {

    const { id } = req.params;

    try {
        const patient = await Patient.findById(id);
        res.status(201).json(patient)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

const deletePatientById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Nenhum paciente com id: ${id}`)
    } 

    await Patient.findByIdAndRemove(id);

    res.json({ message: "Paciente deletado com successo."})

}

const updatePatientById = async (req, res) => {
    const { id } = req.params;
    const { email, name, surname, password, cpf, dx, phone, weight, height, gender, allergies, meds } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Nenhum paciente encontrado com esse id: ${id}`)
    }

    const updatedPatient = { email, name, surname, password, cpf, dx, phone, weight, height, gender, allergies, meds }

    await Patient.findByIdAndUpdate(id, updatedPatient, {new: true})

    res.json(updatedPatient)
}

module.exports = {
    addPatient, getPatientById, deletePatientById, updatePatientById, signin
}