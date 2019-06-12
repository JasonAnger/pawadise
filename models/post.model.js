const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of User toString is Author
    author: String,
    //Storing some basic information of user
    body: String,
    comments: [{ 
        //ObjectID of User toString is Comment's Author
        commentsAuthor: String,
        body: String, 
        date: Date,
    }],
    likes: [{ 
        likedUserName: String, 
        likedUserID: String 
    }],
    date: { type: Date, default: Date.now },
    //Post too long readMore = true (Hidden some in the body), 
    // ?readMore = false (Show it normally)
    readMore: Boolean,
})
const Post = mongoose.model('Post', postSchema, 'pawadise')

module.exports = Post