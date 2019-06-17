const mongoose = require('mongoose')
const md5 = require('md5')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')

module.exports.getLogin = function (req, res) {
    res.status(200).send('Logged In')
}

module.exports.postLogin = async (req, res) => {
    User.findOne({ username: req.body.username })
        .exec((err, user) => {
            if (err) {
                res.status(400).send({
                    errors: ['User does not exist.']
                })
                return
            }
            let hashedPassword = md5(req.body.password) + req.body.username
            bcrypt.compare(hashedPassword, user.hash).then( async (result) => {
                if (!result) {
                    res.status(500).send({
                        errors: ['Wrong password!']
                    })
                    return
                }
                else {
                    const token = await user.generateAuthToken()
                    res.status(202).send({ user, token })
                }
            })
        })
}

//Testing part
// User.find({ username: 'darkestdawn' })
//     .exec((err, users) => {
//         if (err) {
//             console.log('fail')
//         }
//         var user = users[0]
//         var password = md5('7749password')
//         //var saltRounds = 10
//         //var salt = bcrypt.genSaltSync(saltRounds)
//         //var hashedPassword = bcrypt.hashSync(password + 'darkestdawn', salt)
//         // console.log(hashedPassword)
//         console.log(user.hash)
//         bcrypt.compare(password + 'darkest',user.hash).then(function(res) {
//             console.log(res)
//             // res == false
//         })
//     })
