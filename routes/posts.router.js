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
        cb(null, new Date().toDateString() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 512 * 512 * 10
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('', upload.array('photos', 8), controller.post)

router.get('/:id', controller.getByID)

router.post('/:id', upload.single('photo'), controller.postByID)

router.post('/:id/like', controller.postLikeByID)

router.delete('/:id', controller.deleteByID)

router.delete('/:id/:comment', controller.deleteCommentByID)

module.exports = router