const mongoose = require('mongoose')
const sharp = require('sharp')


const Post = require('../models/post.model')
const User = require('../models/user.model')

module.exports.getByID = async (req, res) => {
    var id = req.params.id
    var result = await Post.findById(id)
    if (!result) {
        return res.status(404).send('No matching results.')
    }
    res.status(200).send(result).catch((error) => {
        res.status(500).send(error)
    })
}


module.exports.postByID = async (req, res) => {
    try {
        var id = req.params.id
        //console.log(req.file)
        var result = await Post.findById(id)
        if (!result) {
            return res.status(404).send('No matching results.')
        }
        var comment = {
            commentsAuthor: req.user._id,
            body: req.body.comment
        }
        if (req.file) { comment.photo = req.file.path }
        result.comments.push(comment)
        //When users comment they can get notifications of Post
        var doesNotificate = await result.notificationReceivers.filter((element) => {
            return element.receiver === req.user._id
        })
        if (!doesNotificate) {
            result.notificationReceivers.push({ receiver: req.user._id })
        }
        //When user comment send notifications to others
        // if (result.photos) {
        //     var postPhotoThumb = await sharp('.'+result.photos[0]).resize({ width: 188, height: 188 }).png().toBuffer()
        // } else {
        //     var user = await User.findById(req.user._id)
        //     var postPhotoThumb = await sharp('.'+user.avatar).resize({ width: 188, height: 188 }).png().toBuffer()
        // }
        result.notificationReceivers.forEach(async (element) => {
            if (element.receiver != req.user._id) {
                var user = await User.findOne({ _id: element.receiver })
                user.notifications.push({
                    body: (req.user.name + " has just commented on this post."),
                    //photo: postPhotoThumb
                })
                user.save()
            }
        })
        result.save()
        res.status(200).send(result)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.postLikeByID = async (req, res) => {
    try {
        var id = req.params.id
        var result = await Post.findById(id)
        if (!result) {
            return res.status(404).send('404 Not Found.')
        }
        var newLikedUser = {
            likedUserID: req.user._id,
            likedUserName: req.user.name
        }
        var doesLike = await result.likes.filter((element) => {
            return element.likedUserID.equals(req.user._id)
        })
        if (doesLike.length == 0) {
            result.likes.push(newLikedUser)
        } else {
            result.likes = await result.likes.filter((element) => {
                return !element.likedUserID.equals(req.user._id)
            })
        }

        result.save()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports.deleteByID = async (req, res) => {
    var id = req.params.id
    await Post.findByIdAndRemove(id)
    res.status(200).send("Your post has been deleted").catch((error) => {
        res.status(500).send(error)
    })
}

