const express = require('express')

const controller = require('../controllers/user.controller')

const router = express.Router()

router.get('',controller.getUsers)

router.get('/search', controller.searchUsers)

router.get('/:username', controller.getUserByUsername)

router.get('*', controller.randomAccess)

module.exports = router