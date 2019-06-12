const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = Schema({
  //Using in posts,
  _id: Schema.Types.ObjectId,
  //Storing some basic information of user
  name: String,
  avatar: String,
  address: {
    street: String,
    district: String,
    city: String
  },
  phoneNumber: String,
  //Store Owner is also a user but have a medal to improve that this user is a store owner
  storeOwner: String
})

const Store = mongoose.model('Store', storeSchema, 'pawadise')

module.exports = Store