const validator = require('validator')

const User = require('../models/user.model')

module.exports = function(req,res,next) {
    var errors = []
    if (!req.body.name) {
        errors.push('Name is required.')
    }
    if (!req.body.username) {
        errors.push('Username is required.')
    }
    if (!validator.isEmail(req.body.email)) {
        errors.push('Email seems wrong.')
    }
    if (req.body.password.length<8) {
        errors.push('Password must have 8 or more than 8 characters.')
    }
    if (!req.body.district) {
        errors.push('District is required.')
    }
    if (!req.body.city) {
        errors.push('City is required.')
    }
    User.find({username: req.body.username}).exec((err,result) => {
        if(result.length>0) {
            errors.push('The username you choose is already exist.')
        }
    })
    if(errors.length) {
        res.status(400).send({
            errors: errors,
            values: req.body
        })
        return
    }
    next()
}