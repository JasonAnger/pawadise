const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of Store toString is Store
    store: Schema.Types.ObjectId,
    //Storing some basic information of user
    description: {type: String, default: ''},
    name: String,
    image: String
})
const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product