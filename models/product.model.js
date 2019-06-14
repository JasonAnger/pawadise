const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of Store toString is Store
    store: {type: String, default: ''},
    //Storing some basic information of user
    description: {type: String, default: ''},
    comments: [{ 
        //ObjectID of User toString is Comment's Author
        commentsAuthor: String,
        body: String, 
        date: Date,
    }],
    image: String,
    //Description too long? readMore = true to hide some, readMore = false no hiding
    likes: [{ 
        likedUserName: String, 
        likedUserID: String 
    }],
    tags: [{tag: {type: String, default: ''}}]
})
const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product