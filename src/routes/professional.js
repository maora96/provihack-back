const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const Session = require("../middlewares/session")

// Mongoose models
const Professional = require('../models/professional');

// professional routes
router.post('/', async function(req, res){
    console.log(req.body)
    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(req.body.email))) {
        return res.status(500).send({
            message: 'Email not valid.',
        })
    }
    try {
        await Professional.create(req.body);
    } catch (error) {
        return res.status(500).send({
            error,
            message: 'Required content not fullfilled.',
        })
    }
    res.status(200).send({
        message: "Ok"

    })
})

router.put('/:id', Session.auth, async function(req, res){
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
})

router.delete('/:id', Session.auth, async function(req,res){
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
})

router.get('/:id', async function(req, res) {
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
})


router.post('/signin', async function(req, res) {
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
            { email: existingProfessional.email, id: existingProfessional.id, , role: 'professional'},
            "provihack",
            { expiresIn: '1h'}
        )

        res.status(200).json({ existingProfessional, token})
    } catch (error) {
        res.status(500).json( { message: error.message})
    }

})




module.exports = router;