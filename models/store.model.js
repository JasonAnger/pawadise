const mongoose = require('mongoose')
const Schema = mongoose.Schema


const storeSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  //Storing some basic information of user
  name: { type: String, default: '' },
  avatar: { type: String, default: 'public/avatar/default.png' },
  address: {
    street: { type: String, default: '' },
    district: { type: String, default: '' },
    city: { type: String, default: '' }
  },
  phoneNumber: { type: String, default: '' },
  //Type of Store: Pet Care? Pet Cafe? Pet Shop?
  storeType: { type: String, default: '' },
  //Store Owner is also a user but have a medal to improve that this user is a store owner
  storeOwner: { type: mongoose.Types.ObjectId, default: null },
  //Reviews
  reviews: [{
    reviewer: mongoose.Types.ObjectId,
    point: {type: Number, default: 4},
    body: String,
    photos: [String]
  }]
})

storeSchema.methods.toJSON = function () {
  const store = this
  const storeObject = store.toObject()
  var sum = 0
  storeObject.reviews.forEach((review) => {
    sum = sum + review.point
  })
  if (sum) storeObject.averagePoint = (sum / storeObject.reviews.length)
  else storeObject.averagePoint = 0
  return storeObject
}


const Store = mongoose.model('Store', storeSchema, 'stores')

module.exports = Store