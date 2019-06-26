const mongoose = require('mongoose')
const sharp = require('sharp')

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
        body: req.body.comment
    }
    result.comments.push(comment)
    //When users comment they can get notifications of Post
    var doesNotificate = await result.notificationReceivers.find({ receiver: req.user._id })
    if (!doesNotificate) {
        result.notificationReceivers.push(req.user._id)
    }
    //When user comment send notifications to others
    var postPhotoThumb = await sharp(result.photos[0].photo).resize({ width: 250, height: 250 }).png().toBuffer()
    result.notificationReceivers.forEach(async (element) => {
        user = await User.findOne({ _id: element.receiver })
        user.notifications.push({
            body: (req.user.name + " has just commented on this post."),
            photo: postPhotoThumb
        })
        user.save()
    });
    result.save()
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}


module.exports.deleteByID = async (req, res) => {
    var id = req.params.id
    await Post.findOneAndRemove({ _id: id })
    res.status(200).send("Your post has been deleted").catch((error) => {
        res.status(500).send(error)
    })
}

