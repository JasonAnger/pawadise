const express = require('express')

const controller = require('../controllers/store.controller')

const router = express.Router()

router.get('/search', controller.search)

router.get('/:id', controller.getByID)

router.post('/:id', controller.postByID)

module.exports = router