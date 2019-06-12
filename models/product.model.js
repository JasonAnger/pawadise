const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of Store toString is Store
    store: String,
    //Storing some basic information of user
    description: String,
    comments: [{ 
        //ObjectID of User toString is Comment's Author
        commentsAuthor: String,
        body: String, 
        date: Date,
    }],
    image: Stringing,
    //Description too long? readMore = true to hide some, readMore = false no hiding
    readMore: Boolean,
    likes: [{ 
        likedUserName: String, 
        likedUserID: String 
    }],
})
const Post = mongoose.model('Post', postSchema, 'pawadise')

module.exports = Post