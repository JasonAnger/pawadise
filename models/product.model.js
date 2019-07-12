const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of Store toString is Store
    store: Schema.Types.ObjectId,
    //Storing some basic information of user
    name: String,
    image: String,
    price: Number
})

productSchema.methods.toJSON = function () {
    const product = this
    const productObject = product.toObject()
    // Replace cai \ thanh cai / ni
    productObject.image = productObject.image.replace('\\', '/').replace('\\', '/')
    delete productObject._id
    delete productObject.store
    return productObject
}

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product