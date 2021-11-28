const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

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

router.put('/:id', async function(req, res){
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

router.delete('/:id', async function(req,res){
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

module.exports = router;