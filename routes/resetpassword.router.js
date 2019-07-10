const express = require('express')
const shortID = require('shortid')
const bcrypt = require('bcrypt')
const md5 = require('md5')

const User = require('../models/user.model')

const Email = require('../email/sendEmail')

const router = express.Router()

router.get('', async (req, res) => {
    res.status(200).send('Reset Password Page')
})

router.post('', async (req, res) => {
    var result = await User.findOne({ username: req.body.username })
    if (!result) {
        res.status(404).send('User does not exist.')
        res.redirect('/resetpassword')
    }
    else {
        if (result.email === req.body.email) {
            var code = shortID.generate()
            Email.sendResetPasswordCodeEmail(result.email, result.name, code)
            res.status(200).redirect(`/resetpassword/${req.body.username}/${md5(code)}`)
        }
        else {
            res.status(404).send('WRONG EMAIL.')
            res.redirect('/resetpassword')
        }
    }
})

router.get('/:username/:id', async (req,res) => {
    res.status(200).send('Reset Password Confirmation Page')
})

router.post('/:username/:id', async (req,res) => {
    var username = req.params.username
    var id = req.params.id
    if (id === md5(req.body.code)) {
        res.status(200).redirect(`/resetpassword/${username}/newpassword`)
    }
    else {
        res.status(404).send('WRONG RESET CODE.').redirect(`/resetpassword/${username}/${id}`)
    }
})

router.get('/:username/newpassword', async (req, res) => {
    res.status(200).send('New Password Page')
})

router.post('/:username/newpassword', async (req, res) => {
    var result = await User.findOne({username: req.params.username})
    password = md5(req.body.password)
    var saltRounds = 10
    var salt = bcrypt.genSaltSync(saltRounds)
    var hashedPassword = bcrypt.hashSync(password + req.params.username, salt)
    result.password = password
    result.hash = hashedPassword
    result.save()
    res.status(200).send('Reseting password is success.').redirect('/login')
})

module.exports = router