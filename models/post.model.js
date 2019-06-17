const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of User toString is Author
    author: {type: Schema.Types.ObjectId, default: null},
    //Storing some basic information of user
    body: {type: String, default: ''},
    comments: [{ 
        //ObjectID of User toString is Comment's Author
        commentsAuthor: String,
        body: String,
        date: Date,
    }],
    likes: [{ 
        likedUserName: {type: String, default: ''},
        likedUserID: {type: String, default: ''},
    }],
    date: { type: Date, default: Date.now },
    //Post too long readMore = true (Hidden some in the body), 
    // ?readMore = false (Show it normally)
    readMore: {type: Boolean, default: false},
    isEvent: {type: Boolean, default: false},
    tags: [{tag: {type: String, default: ''}}]
})
const Post = mongoose.model('Post', postSchema, 'posts')

module.exports = Post