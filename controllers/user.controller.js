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