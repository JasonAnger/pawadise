const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  //Using in posts,
  _id: Schema.Types.ObjectId,
  //Username to login
  username: String,
  //Storing some basic information of user
  name: {
    first: String,
    last: String
  },
  age: Number,
  avatar: String,
  address: {
    street: String,
    district: String,
    city: String
  },
  phoneNumber: String,
  //password save as md5 String and hash is a bcrypt hash to be more secure 
  password: String,
  hash: String,
  //Store Owner is also a user but have a medal to improve that this user is a store owner
  storeOwner: Boolean
})

const User = mongoose.model('User', userSchema, 'pawadise')

module.exports = User