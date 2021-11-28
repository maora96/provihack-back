const express = require('express')
const router = express.Router()

const Patient = require("../controllers/patient")

const Session = require("../middlewares/session")

// patient routes
router.post('/', Patient.addPatient)
router.post('/signin', Patient.signin)

router.get('/:id', Patient.getPatientById)
router.put('/:id', Session.auth, Patient.updatePatientById)
router.delete('/:id', Session.auth, Patient.deletePatientById)

module.exports = router;