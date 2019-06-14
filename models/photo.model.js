const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of User toString is Author of photo
    author: String,
    url: String
})
const Photo = mongoose.model('Photo', photoSchema, 'photos')

module.exports = Photo