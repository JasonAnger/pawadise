const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const controller = require('../controllers/user.controller')

const router = express.Router()

router.get('', controller.getUsers)

router.get('/search', controller.searchUsers)

router.get('/me', async (req, res) => {
    res.send(req.user)
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/me/avatar', upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/:username', controller.getUserByUsername)

router.get('*', controller.randomAccess)

module.exports = router