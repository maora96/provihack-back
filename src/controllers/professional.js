const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const Password = require('../utils/password')
const Professional = require('../models/professional')

const addProfessional = async (req, res) => {
    console.log(req.body)
    const { name, cpf, crm, email, specialty, password } = req.body;

    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
        return res.status(500).send({
            message: 'Email not valid.',
        })
    }

    // encrypt password

    const hashedPassword = await Password.encrypt(password)

    const newProfessional = new Professional ({name, cpf, crm, email, specialty, password: hashedPassword})

    try {
        //await Professional.create(req.body);
        await newProfessional.save();
    } catch (error) {
        return res.status(500).send({
            error,
            message: 'Required content not fullfilled.',
        })
    }
    res.status(200).send({
        message: "Ok"

    })
}

const getProfessionalById = async (req, res) => {
    let id;
    try {
        id = mongoose.Types.ObjectId(req.params.id);
    } catch (error) {
        return res.status(500).send({
            error,
            message: 'Provided id is not valid.',
        })
    }
    const prof = await Professional.findById(id);
    res.status(200).send(prof);
}

const deleteProfessionalById = async (req, res) => {
    let id;
    try{
        id = mongoose.Types.ObjectId(req.params.id);
    }
    catch(error){
        return res.status(500).send({
            error,
            message: 'Provided id is not valid.',
        })
    }
    await Professional.findByIdAndDelete(id);
    res.status(200).send({
        message: "Ok"

    })

}

const updateProfessionalById = async (req, res) => {
    console.log(req.body)
    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(req.body.email))) {
        return res.status(500).send({
            message: 'Email not valid.',
        })
    }
    let id;
    try {
        id = mongoose.Types.ObjectId(req.params.id);
    } catch (error) {
        return res.status(500).send({
            error,
            message: 'Provided id is not valid.',
        })
    }
    try {
        await Professional.findByIdAndUpdate(id, req.body);
    } catch (error) {
        return res.status(500).send({
            error,
            message: 'Required content not fullfilled.',
        })
    }
    res.status(200).send({
        message: "Ok"

    })

}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingProfessional = await Professional.findOne({ email })
        if (!existingProfessional) {
            return res.status(404).json( {message: "Paciente não existe."})
        }

        const isPasswordCorrect = Password.check(password, existingProfessional.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Credenciais inválidos."})
        }

        const token = jwt.sign(
            { email: existingProfessional.email, id: existingProfessional.id, role: 'professional'},
            "provihack",
            { expiresIn: '1h'}
        )

        res.status(200).json({ existingProfessional, token})
    } catch (error) {
        res.status(500).json( { message: error.message})
    }
}

module.exports = {
    addProfessional, getProfessionalById, deleteProfessionalById, updateProfessionalById, signin
}