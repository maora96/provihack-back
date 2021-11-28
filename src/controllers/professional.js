

const addProfessional = async (req, res) => {
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

module.exports = {
    addProfessional, getProfessionalById, deleteProfessionalById, updateProfessionalById
}