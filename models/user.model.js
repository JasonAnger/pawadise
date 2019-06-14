const mongoose = require('mongoose')
const md5 = require('md5')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/pawadise', { useNewUrlParser: true })

const userSchema = Schema({
  //Using in posts,
  _id: Schema.Types.ObjectId,
  //Username to login
  username: String,
  //Storing some basic information of user
  name: {
    first: { type: String, default: '' },
    last: { type: String, default: '' }
  },
  age: { type: Number, default: '20' },
  avatar: { type: String, default: '' },
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
  storeOwner: { type: Boolean, default: false }
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User

// var password = md5('7749password')
// var saltRounds = 10
// var salt = bcrypt.genSaltSync(saltRounds)
// var hash1 = bcrypt.hashSync(password + 'darkestdawn', salt)
// var hash2 = bcrypt.hashSync(password + 'sungoesdown', salt)
// var Dawn = new User({ _id: new mongoose.Types.ObjectId(), username: 'darkestdawn', password: password, hash: hash1 })
// Dawn.save(function (err) {
//   if (err) return handleError(err)
// })
// //console.log(Dawn)

// var Sun = new User({ _id: new mongoose.Types.ObjectId(), username: 'sungoesdown', password: password, hash: hash2 })
// Sun.save(function (err) {
//   if (err) return handleError(err)
// })
//console.log(Sun)

// User.find({ age: 20 })
//   .exec((err, users) => {
//     if (err) {
//       console.log({ message: err.message });
//     }
//     console.log(users[0].username)
//   })

