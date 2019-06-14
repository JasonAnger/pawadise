const mongoose = require('mongoose')
const md5 = require('md5')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')

module.exports.getRegister = function (req, res) {
    res.render('register')
}

module.exports.postRegister = function (req, res) {
    var password = md5(req.body.password)
    var saltRounds = 10
    var salt = bcrypt.genSaltSync(saltRounds)
    var hashedPassword = bcrypt.hashSync(password + req.body.username, salt)
    User.create(
        {
            name: {
                first: req.body.firstName,
                last: req.body.lastName
            }
        },
        { age: req.body.age },
        {
            address: {
                street: req.body.street,
                district: req.body.district,
                city: req.body.city
            }
        },
        { phoneNumber: req.body.phoneNumber },
        { password: password },
        { hash: hashedPassword }, function (req, res) {
            res.redirect('/login')
        })
}