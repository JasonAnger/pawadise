const express = require('express')
const mongoose = require('mongoose')

//const controller = require('../controllers/post.controller')

const Photo = require('../models/photo.model')

const router = express.Router()

router.get('/:type', async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1
        const perPage = 20
        let type = req.params.type
        let result
        if (type == 'pet') {
            result = await Photo.find().skip((page - 1) * perPage).limit(perPage)
        } else if (type == 'cat') {
            result = await Photo.find({ cat: true }).skip((page - 1) * perPage).limit(perPage)
        } else if (type == 'dog') {
            result = await Photo.find({ dog: true }).skip((page - 1) * perPage).limit(perPage)
        } else if (type == 'rat') {
            result = await Photo.find({ rat: true }).skip((page - 1) * perPage).limit(perPage)
        } else if (type == 'hamster') {
            result = await Photo.find({ hamster: true }).skip((page - 1) * perPage).limit(perPage)
        } else if (type == 'guineapig') {
            result = await Photo.find({ guineaPig: true }).skip((page - 1) * perPage).limit(perPage)
        } else if (type == 'hedgehog') {
            result = await Photo.find({ hedgehog: true }).skip((page - 1) * perPage).limit(perPage)
        } else if (type == 'rabbit') {
            result = await Photo.find({ rabbit: true }).skip((page - 1) * perPage).limit(perPage)
        } 
        res.status(200).send(result)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('', async (req, res) => {
    try {
        var newPhoto = new Photo({
            _id: new mongoose.Types.ObjectId,
            link: req.body.link,
            cat: req.body.cat,
            dog: req.body.dog,
            guineaPig: req.body.guineaPig,
            hamster: req.body.hamster,
            hedgehog: req.body.hedgehog,
            rat: req.body.rat,
            rabbit: req.body.rabbit
        })
        newPhoto.save().then(() => {
            res.status(200).send(newPhoto)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})


module.exports = router