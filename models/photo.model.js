const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = Schema({
    _id: Schema.Types.ObjectId,
    //ObjectID of User toString is Author
    link: {type: String, unique: true},
    cat: {type: Boolean, default: false},
    dog: {type: Boolean, default: false},
    guineaPig: {type: Boolean, default: false},
    hamster: {type: Boolean, default: false},
    hedgehog: {type: Boolean, default: false},
    rat: {type: Boolean, default: false},
    rabbit: {type: Boolean, default: false}
})

photoSchema.methods.toJSON = function () {
    const post = this
    const postObject = post.toObject()
    delete postObject._id
    delete postObject.cat
    delete postObject.dog
    delete postObject.guineaPig
    delete postObject.hamster
    delete postObject.hedgehog
    delete postObject.rat
    delete postObject.rabbit
    delete postObject.__v
    return postObject
}

const Photo = mongoose.model('Photo', photoSchema, 'photos')

module.exports = Photo