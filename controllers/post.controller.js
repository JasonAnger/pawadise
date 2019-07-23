const mongoose = require('mongoose')

const Post = require('../models/post.model')
const User = require('../models/user.model')

module.exports.post = async (req, res) => {
    try {
        var newPost = new Post({
            _id: new mongoose.Types.ObjectId,
            author: req.user._id,
            authorName: req.user.name,
            body: req.body.body,
            isEvent: req.body.check,
            tags: req.body.tags
        })
        if (req.files.length != 0) {
            for (let i = 0; i < req.files.length; i++) {
                newPost.photos.push(req.files[i].path)
            }
        }
        newPost.notificationReceivers.push({ receiver: req.user._id })
        newPost.save().then(() => {
            res.status(200).send(newPost)
        })
    } catch (err) {
        res.status(400).json(err)
    }
}

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
            avatar: req.user.avatar,
            authorName: req.user.name,
            body: req.body.comment
        }
        if (req.file) { comment.photo = req.file.path }
        result.comments.push(comment)
        //When users comment they can get notifications of Post
        var doesNotificate = await result.notificationReceivers.filter((element) => {
            return element.receiver.equals(req.user._id)
        })
        if (doesNotificate.length == 0) {
            result.notificationReceivers.push({ receiver: req.user._id })
        }
        result.notificationReceivers.forEach(async (element) => {
            if (element.receiver != req.user._id) {
                var user = await User.findOne({ _id: element.receiver })
                user.notifications.push({
                    body: (req.user.name + " commented on this post."),
                })
                user.save()
            }
        })
        result.updatedAt = Date.now()
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
            if (!result.author.equals(req.user._id)) {
                var user = await User.findOne({ _id: result.author })
                user.notifications.push({
                    body: (req.user.name + " đã thích bài viết của bạn."),
                })
                user.save()
            }
        } else {
            result.likes = await result.likes.filter((element) => {
                return !element.likedUserID.equals(req.user._id)
            })
        }
        result.updatedAt = Date.now()
        result.save()
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports.deleteByID = async (req, res) => {
    var id = req.params.id
    var result = await Post.findById(id)
    if (req.user._id != result.author) {
        await Post.findByIdAndDelete(id)
        res.status(200).send("Your post has been deleted")
    } else { res.status(405).send("405 METHOD NOT ALLOWED") }
}

module.exports.deleteCommentByID = async (req, res) => {
    var id = req.params.id
    var comment = req.params.comment
    var result = await Post.findById(id)
    if (req.user._id != result.author) {
        result.comments=result.comments.filter((element) => { return !element._id.equals(comment)})
        result.save()
        res.status(200).send("Your post has been deleted")
    } else { res.status(405).send("405 METHOD NOT ALLOWED") }
}
