const express = require('express')
const router = express.Router()

const Record = require('../controllers/record')
const Session = require('../middlewares/session')

// record routes
router.post('/', Session.auth, Record.addRecord)

router.put('/:id', Session.auth, Record.updateRecordById)

router.delete('/:id', Session.auth, Record.deleteRecordById)

router.get('/:id', Session.auth, Record.getRecordById)
router.get('/:id/professional',  Record.checkIfProfessionalIsAllowed)

router.put('/:id/professional', Session.auth, Record.updateAllowedProfessionals)

module.exports = router;