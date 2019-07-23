const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = require("./user.model")

const postSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of User toString is Author
    author: { type: Schema.Types.ObjectId, default: null },
    authorName: String,
    //Storing some basic information of user
    body: { type: String, default: '' },
    comments: [{
        //ObjectID of User toString is Comment's Author
        commentsAuthor: Schema.Types.ObjectId,
        authorName: String,
        avatar: String,
        body: String,
        photo: { type: String, default: '' },
        date: { type: Date, default: Date.now }
    }],
    likes: [{
        likedUserID: Schema.Types.ObjectId,
        likedUserName: String
    }],
    date: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    //Post too long readMore = true (Hidden some in the body), 
    // ?readMore = false (Show it normally)
    readMore: { type: Boolean, default: false },
    isEvent: { type: Boolean, default: false },
    isSale: { type: Boolean, default: false },
    notificationReceivers: [{ receiver: Schema.Types.ObjectId }],
    tags: [{ tag: { type: String, default: '' } }],
    photos: [String]
})

// postSchema.methods.takeAuthorName = async () => {
//     const post = this
//     const postObject = post.
//     var result = await User.findById(postObject.author)
//     console.log(result)
//     return result.name
// }


postSchema.methods.toJSON = function () {
    const post = this
    const postObject = post.toObject()
    for (let i = 0; i < postObject.photos.length; i++) {
        postObject.photos[i] = postObject.photos[i].replace('\\', '/').replace('\\', '/')
    }
    for (let i = 0; i < postObject.comments.length; i++) {
        postObject.comments[i].photo = postObject.comments[i].photo.replace('\\', '/').replace('\\', '/')
    }
    postObject.likesQuantity = post.likes.length
    return postObject
}

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post