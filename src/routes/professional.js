const express = require('express')
const router = express.Router()

const controller = require('../controllers/professional');

const Session = require("../middlewares/session");

// professional routes
router.post('/', controller.addProfessional)

router.put('/:id', Session.auth, controller.updateProfessionalById)

router.delete('/:id', Session.auth,controller.deleteProfessionalById)

router.get('/:id', controller.getProfessionalById)

router.post('/signin', controller.signin)

module.exports = router;