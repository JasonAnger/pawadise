const express = require('express')
const multer = require('multer')

//const sharp = require('sharp')

//const User = require('../models/user.model')

const loginAuth = require('../auth/login.auth')

const controller = require('../controllers/user.controller')

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/avatar/')
    },
    filename: (req, file, cb) => {
        cb(null,new Date().toDateString() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 512 * 512 * 5
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})


router.get('', controller.getUsers)

router.get('/search', controller.searchUsers)

router.get('/me', controller.getMe)

router.get('/:id', controller.getUserById)

router.patch('/me', upload.single('avatar'), controller.patchUser)

router.get('/:username', controller.getUserByUsername)

router.get('*', controller.randomAccess)

module.exports = router