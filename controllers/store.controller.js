const Store = require('../models/store.model')

module.exports.getByID = async (req, res) => {
    var id = req.params.id
    var result = await Store.findOne({ _id: ObjectID(id) }).exec()
    if (!result) {
        return res.status(404).send('404 Not found.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}


module.exports.postByID = async (req, res) => {
    var id = req.params.id
    var result = await Store.findOne({ _id: ObjectID(id) }).exec()
    if (!result) {
        return res.status(404).send('404 Not found.')
    }
    var review = {
        reviewer: req.user._id,
        point: req.body.point,
        body: req.body.comment
    }
    result.reviews.push(review)
    result.save()
    res.status(200).catch((error) => {
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
    var result = await Store.find({ storeType: 'Shop' }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.getCafe = async (req, res) => {
    var result = await Store.find({ storeType: 'Cafe' }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.getMedical = async (req, res) => {
    var result = await Store.find({ storeType: 'Medical' }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}
