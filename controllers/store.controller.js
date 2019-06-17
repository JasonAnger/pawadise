const Store = require('../models/store.model')

module.exports.getByID = async (req, res) => {
    var id = req.params.id
    var result = await Store.findOne({ _id: ObjectID(id) }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.search = async (req, res) => {
    var q = req.query.q
    var result = await Store.find({ name: /q/i }).exec()
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.getShop = async (req, res) => {
    var id = req.params.id
    var result = await Store.find({ storeType: 'Shop' }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.getCafe = async (req, res) => {
    var id = req.params.id
    var result = await Store.find({ storeType: 'Cafe' }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.getMedical = async (req, res) => {
    var id = req.params.id
    var result = await Store.find({ storeType: 'Medical' }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}
