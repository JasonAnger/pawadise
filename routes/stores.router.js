const express = require('express')

const controller = require('../controllers/stores.controller')

const router = express.Router()

router.get('/search', controller.search)

router.get('/:id', controller.viewID)

module.exports = router