const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const controller = require('../controllers/professional');

const Session = require("../middlewares/session");

// Mongoose models
const Professional = require('../models/professional');

// professional routes
router.post('/', controller.addProfessional)

router.put('/:id', Session.auth, controller.updateProfessionalById)

router.delete('/:id', Session.auth,controller.deleteProfessionalById)

router.get('/:id', controller.getProfessionalById)

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
            { email: existingProfessional.email, id: existingProfessional.id},
            "provihack",
            { expiresIn: '1h'}
        )

        res.status(200).json({ existingProfessional, token})
    } catch (error) {
        res.status(500).json( { message: error.message})
    }

})




module.exports = router;