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
        cb(null,new Date().toISOString() + file.originalname)
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


router.get('', controller.getUsers)

router.get('/search', controller.searchUsers)

router.get('/me', async (req, res) => {
    res.send(req.user)
})

router.get('/:id', controller.getUserById)

router.patch('/me', loginAuth, upload.single('avatar'), async (req, res) => {
    req.body.avatar = req.file.path
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'avatar', 'street', 'district', 'city', 'phoneNumber']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/:username', controller.getUserByUsername)

router.get('*', controller.randomAccess)

module.exports = router