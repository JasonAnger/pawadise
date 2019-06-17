const express = require('express')

const controller = require('../controllers/post.controller')

const router = express.Router()

router.get('/:id', controller.getByID)

router.post('/:id', controller.getByID)

module.exports = router