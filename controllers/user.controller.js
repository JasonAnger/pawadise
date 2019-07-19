const User = require('../models/user.model')


module.exports.getUsers = async (req, res) => {
    var username = req.params.username
    var result = await User.find().exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}


module.exports.getUserByUsername = async (req, res) => {
    var username = req.params.username
    var result = await User.findOne({ username: username }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.getMe = async (req, res) => {
    res.send(req.user)
}

module.exports.getUserById = async (req, res) => {
    var id = req.params.id
    var result = await User.findById(id)
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.patchUser = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'avatar', 'street', 'district', 'city', 'phoneNumber']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        if (req.file !== undefined) { req.body.avatar = req.file.path }
        if (req.body.street) req.user.address.street = req.body.street
        if (req.body.district) req.user.address.district = req.body.district
        if (req.body.city) req.user.address.city = req.body.city
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports.searchUsers = async (req, res) => {
    var q = req.query.q
    var result = await User.find({ name: /q/i }).exec()
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.randomAccess = async (req, res) => {
    res.status(404).send('404 Not Found').catch((error) => {
        res.status(500).send(error)
    })
}
// User.findOne({username: 'sungoesdown'}).exec((err,result) => {
//     console.log(result)
// })