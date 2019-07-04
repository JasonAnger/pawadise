const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of User toString is Author
    author: { type: Schema.Types.ObjectId, default: null },
    //Storing some basic information of user
    body: { type: String, default: '' },
    comments: [{
        //ObjectID of User toString is Comment's Author
        commentsAuthor: Schema.Types.ObjectId,
        body: String,
        photo: { type: String, default: '' },
        date: { type: Date, default: Date.now }
    }],
    likes: [{
        likedUserID: Schema.Types.ObjectId,
        likedUserName: String
    }],
    date: { type: Date, default: Date.now },
    //Post too long readMore = true (Hidden some in the body), 
    // ?readMore = false (Show it normally)
    readMore: { type: Boolean, default: false },
    isEvent: { type: Boolean, default: false },
    isSale: { type: Boolean, default: false },
    notificationReceivers: [{ receiver: Schema.Types.ObjectId }],
    tags: [{ tag: { type: String, default: '' } }],
    photos: [String]
})

postSchema.methods.toJSON = function () {
    const post = this
    const postObject = post.toObject()
    postObject.likesQuantity = post.likes.length
    return postObject
}

const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post