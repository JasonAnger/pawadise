const validator = require('validator')

const User = require('../models/user.model')

module.exports = async (req, res, next) => {
    var errors = []
    if (!req.body.name) {
        errors.push('Name is required.')
    }
    if (!req.body.username) {
        errors.push('Username is required.')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { all_lowercase: true, gmail_convert_googlemaildotcom: true, gmail_lowercase: true, gmail_remove_subaddress: true })
    if (!validator.isEmail(req.body.email)) {
        errors.push('Email seems wrong.')
    }
    if (req.body.password.length < 8) {
        errors.push('Password must have 8 or more than 8 characters.')
    }
    if (!req.body.district) {
        errors.push('District is required.')
    }
    if (!req.body.city) {
        errors.push('City is required.')
    }
    await User.find({ username: req.body.username }).exec((err, result) => {
        if (result.length > 0) {
            errors.push('The username you choose is already exist.')
        }
    })
    if (errors.length) {
        res.status(400).send({
            errors: errors,
            values: req.body
        })
        return
    }
    next()
}