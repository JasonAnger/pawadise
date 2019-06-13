const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = Schema({
    _id: Schema.Types.ObjectId,
    //Username to login
    username: String,
    //Storing some basic information of user
    name: {
        first: { type: String, default: '' },
        last: { type: String, default: '' }
    },
    requestContent: { type: String, default: '' },
    tags: [{ tag: { type: String, default: '' } }]
})
const Request = mongoose.model('Request', requestSchema, 'requests')

module.exports = Request