const Store = require('../models/store.model')
const Product = require('../models/product.model')
const mongoose = require('mongoose')

module.exports.createNewStore = async (req, res) => {
    try {
        var newStore = new Store({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            openTime: req.body.openTime,
            description: req.body.description,
            storeType: req.body.storeType
        })
        if (req.files.length != 0) {
            for (let i = 0; i < req.files.length - 1; i++) {
                newStore.photos.push(req.files[i].path)
            }
            newStore.avatar = req.files[req.files.length - 1].path
        }
        newStore.save().then(() => {
            res.status(200).send(newStore)
        })
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.patchByID = async (req, res) => {
    try {
        var id = req.params.id
        var result = await Store.findById(id)
        if (!result) {
            return res.status(404).send('404 Not found.')
        }
        if(req.body.address) result.address=req.body.address
        if(req.body.phoneNumber) result.phoneNumber=req.body.phoneNumber
        if(req.body.openTime) result.openTime=req.body.openTime
        if(req.body.description) result.description=req.body.description
        if (req.files) {
            for (var i = 0; i < req.files.length; i++) {
                result.photos.push(req.files[i].path)
            }
        }
        result.save()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports.getByID = async (req, res) => {
    try {
        var id = req.params.id
        var result = await Store.findById(id)
        if (!result) {
            return res.status(404).send('404 Not found.')
        }
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getProductByID = async (req, res) => {
    try {
        let id = req.params.id
        let page = parseInt(req.query.page) || 1
        const perPage = 12
        let result = await Product.find({ store: id }).skip((page - 1) * perPage).limit(perPage)
        if (!result) {
            return res.status(404).send('404 Not found.')
        }
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
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
            author: req.user.name,
            avatar: req.user.avatar,
            body: req.body.body,
            point: req.body.point
        }
        if (req.files) {
            for (var i = 0; i < req.files.length; i++) {
                newReview.photos.push(req.files[i].path)
                result.photos.push(req.files[i].path)
            }
        }
        result.reviews.push(newReview)
        result.save()
        res.status(200).send(newReview)
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports.postProductByID = async (req, res) => {
    try {
        var id = req.params.id
        var result = await Store.findById(id)
        if (!result) {
            return res.status(404).send('404 Not found.')
        }
        var newProduct = new Product({
            _id: new mongoose.Types.ObjectId,
            store: id,
            name: req.body.name,
            image: req.file.path,
            price: req.body.price
        })
        newProduct.save()
        res.status(200).send(newProduct)
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports.search = async (req, res) => {
    try {
        var q = req.query.q
        var result = await Store.find({name: {$regex: q, $options: 'i'}}).exec()
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getShop = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1
        const perPage = 6
        let result = await Store.find({ storeType: 'Shop' }).skip((page - 1) * perPage).limit(perPage)
        if (!result) {
            return res.status(404).send('No matching results.')
        }
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getService = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1
        const perPage = 6
        let result = await Store.find({ storeType: 'Service' }).skip((page - 1) * perPage).limit(perPage)
        if (!result) {
            return res.status(404).send('No matching results.')
        }
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}