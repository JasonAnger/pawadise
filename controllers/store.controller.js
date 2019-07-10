const Store = require('../models/store.model')
const mongoose = require('mongoose')

module.exports.createNewStore = async (req, res) => {
    var newStore = new Store({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        address: {
            street: req.body.street,
            district: req.body.district,
            city: req.body.city
        },
        phoneNumber: req.body.phoneNumber,
        storeType: req.body.storeType
    })
    if (req.file) { newStore.avatar = req.file.path }
    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            newStore.photos.push(req.files[i].path)
        }
    }
    newStore.save().then(() => {
        res.status(200).send(newStore)
    }).catch((err) => {
        res.status(400).send(err)
    })
}

module.exports.getByID = async (req, res) => {
    var id = req.params.id
    var result = await Store.findById(id)
    if (!result) {
        return res.status(404).send('404 Not found.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}


module.exports.postByID = async (req, res) => {
    try {
        var id = req.params.id
        var result = await Store.findById(id)
        if (!result) {
            return res.status(404).send('404 Not found.')
        }
        var newReview = {
            reviewer: req.user._id,
            body: req.body.body,
            point: req.body.point
        }
        if (req.file) {
            for (var i = 0; i < req.files.length; i++) {
                newReview.photos.push(req.files[i].path)
            }
        }
        result.reviews.push(newReview)
        result.save()
        res.status(200).send(newReview)
    } catch (e) {
        res.status(500).send(e)
    }
}



module.exports.search = async (req, res) => {
    var q = req.query.q
    var result = await Store.find({ name: /q/i }).exec()
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.getShop = async (req, res) => {
    let page = parseInt(req.query.page) || 1
    const perPage = 1
    let result = await Store.find({ storeType: 'Shop' }).skip((page - 1) * perPage).limit(perPage)
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.getService = async (req, res) => {
    let page = parseInt(req.query.page) || 1
    const perPage = 10
    let result = await Store.find({ storeType: 'Service' }).skip((page - 1) * perPage).limit(perPage)
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}