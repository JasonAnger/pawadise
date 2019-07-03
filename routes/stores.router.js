const express = require('express')
const multer = require('multer')

const controller = require('../controllers/store.controller')

const router = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/stores/')
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

router.post('/', upload.single('avatar'), upload.array('photos', 8), controller.createNewStore)

router.get('/search', controller.search)

router.get('/:id', controller.getByID)

router.post('/:id', upload.array('photos', 4), controller.postByID)

module.exports = router