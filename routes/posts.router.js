const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')

const controller = require('../controllers/post.controller')

const Post = require('../models/post.model')

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/posts/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 512 * 512 * 5
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('', upload.array('photos', 8), async (req, res) => {
    try {
        var newPost = new Post({
            _id: new mongoose.Types.ObjectId,
            author: req.user._id,
            body: req.body.body,
            isEvent: req.body.check,
            tags: req.body.tags
        })
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                newPost.photos.push(req.files[i].path)
            }
        }
        newPost.notificationReceivers.push({receiver: req.user._id})
        newPost.save().then(() => {
            res.status(200).send(newPost)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/:id', controller.getByID)

router.post('/:id', upload.single('photo'), controller.postByID)

router.delete('/:id', controller.deleteByID)


module.exports = router