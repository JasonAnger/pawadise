const Post = require('../models/post.model')

module.exports.getByID = async (req, res) => {
    var id = req.params.id
    var result = await Post.findOne({ _id: ObjectID(id) }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}

module.exports.postByID = async (req, res) => {
    var id = req.params.id
    var result = await Post.findOne({ _id: ObjectID(id) }).exec()
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    var comment = {
        author: req.user._id,
        body: req.body.comment}
    result.comments.push(comment)
    result.save()
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}