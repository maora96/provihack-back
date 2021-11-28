const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Record = require('../models/record')
const jwt = require('jsonwebtoken');
const Password = require('../utils/password');
const record = require('../models/record');


const addRecord = async (req, res) => {

    const { patientId } = req.body;

    try {

        // check if patient already has record
        const hasRecord = await Record.findOne({patientId})
        if (hasRecord) {
            return res.status(404).json( { message: "Paciente já possui prontuário."})
        }

        const newRecord = new Record({
            patientId
        })

        await newRecord.save()

        res.status(201).json(newRecord)


    } catch (error) {
        res.status(409).json( { message: error.message })
    }

}

const getRecordById = async (req, res) => {

    const { id } = req.params;

    try {
        const record = await Record.findById(id);
        res.status(201).json(addRecord)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

const deleteRecordById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Nenhum prontuário com id: ${id}`)
    } 

    await record.findByIdAndRemove(id);

    res.json({ message: "Prontuário deletado com successo."})


}

const updateRecordById = async (req, res) => {
    const { id } = req.params;
    const { patientId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Nenhum prontuário encontrado com esse id: ${id}`)
    }

    const updatedRecord = { patientId }

    await Record.findByIdAndUpdate(id, updatedRecord, {new: true})

    res.json(updatedRecord)
}

const updateAllowedProfessionals = async (req, res) => {
    const { id } = req.params;
    const { professionalId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Nenhum prontuário encontrado com esse id: ${id}`)
    }

    // adicionar id do profissional na lista de profissionais permitidos no prontuário

    await Record.findOneAndUpdate(id, { professionals: [...professionals, professionalId]})
    const updatedRecord = Record.findOne(id);

    res.status(201).json({updatedRecord})
}

const checkIfProfessionalIsAllowed = async (req, res) => {
    const { id } = req.params;
    const { professionalId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`Nenhum prontuário encontrado com esse id: ${id}`)
    }

    const foundRecords = await Record.find({id})

    if (foundRecords) {
        // checar se a id do profissional está na array de profissionais permitidos do prontuário
    }

}


module.exports = {
    addRecord, getRecordById, deleteRecordById, updateRecordById, updateAllowedProfessionals
}