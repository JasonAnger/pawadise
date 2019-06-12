const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of User toString is Author
    author: String,
    //Storing some basic information of user
    url: String
})
const Photo = mongoose.model('Photo', photoSchema, 'pawadise')

module.exports = Photo