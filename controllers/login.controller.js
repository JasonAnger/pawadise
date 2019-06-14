const mongoose = require('mongoose')
const md5 = require('md5')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')

module.exports.getLogin = function (req, res) {
    res.render('login')
}

module.exports.postLogin = function (req, res) {
    User.find({ username: req.body.username })
        .exec((err, users) => {
            if (err) {
                res.render('login', {
                    errors: ['User does not exist.']
                })
                return
            }
            user = users[0]
            let hashedPassword = req.body.username + md5(req.body.password)
            if (!bcrypt.compare(hashedPassword, user.hash)) {
                res.render('login', {
                    errors: ['Wrong password!'],
                    value: (value + 1 || 0)
                })
                return
            }
            else {
                res.redirect('/home', { user: user })
            }
        })
}

// Testing part
// User.find({ username: 'darkestdawn' })
//     .exec((err, users) => {
//         if (err) {
//             console.log('fail')
//         }
//         var user = users[0]
//         var password = md5('7749password')
//         var saltRounds = 10
//         var salt = bcrypt.genSaltSync(saltRounds)
//         var hashedPassword = bcrypt.hashSync(password + 'darkestdawn', salt)
//         console.log(hashedPassword)
//         console.log(user.hash)
//         if (hashedPassword === user.hash) {
//             console.log('Logged In')
//         }
//     })
