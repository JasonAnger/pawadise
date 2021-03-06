const mongoose = require('mongoose')
const md5 = require('md5')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')
const Email = require('../email/sendEmail')

module.exports.getRegister = function (req, res) {
    res.status(200).send('Got to Register Page.')
}

module.exports.postRegister = (req, res) => {
    Email.sendWelcomeEmail(req.body.email, req.body.name)
    var password = md5(req.body.password)
    var saltRounds = 10
    var salt = bcrypt.genSaltSync(saltRounds)
    var hashedPassword = bcrypt.hashSync(password + req.body.username, salt)
    var newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        address: {
            street: (req.body.street || ""),
            district: (req.body.district || ""),
            city: req.body.city
        },
        phoneNumber: req.body.phoneNumber,
        password: password,
        hash: hashedPassword
    })
    newUser.save().then( () => {
        res.status(201).send(newUser)
    }).catch((err) => {
        res.status(400).send(err)
    })
}