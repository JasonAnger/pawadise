const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')


const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/pawadise', { useNewUrlParser: true })

const userSchema = Schema({
  //Using in posts,
  _id: Schema.Types.ObjectId,
  //Username to login
  username: String,
  //Storing some basic information of user
  name: { type: String, trim: true },
  age: {
    type: Number,
    default: 20,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a postive number')
      }
    }
  },
  avatar: Buffer,
  address: {
    street: { type: String, trim: true },
    district: { type: String, trim: true },
    city: { type: String, trim: true },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  phoneNumber: { type: String, trim: true },
  //password save as md5 String and hash is a bcrypt hash to be more secure 
  password: String,
  //hash = bcrypt 10 times (md5Password + username)
  hash: String,
  //Store Owner is also a user but have a medal to improve that this user is a store owner
  storeOwner: { type: Boolean, default: false },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'Signed In')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// // Delete user tasks when user is removed
// userSchema.pre('remove', async function (next) {
//   const user = this
//   await Task.deleteMany({ owner: user._id })
//   next()
// })


const User = mongoose.model('User', userSchema, 'users')

module.exports = User


// const md5 = require('md5')
// const bcrypt = require('bcrypt')
// var password = md5('7749password')
// var saltRounds = 10
// var salt = bcrypt.genSaltSync(saltRounds)
// var hash1 = bcrypt.hashSync(password + 'darkestdawn', salt)
// var hash2 = bcrypt.hashSync(password + 'sungoesdown', salt)
// // var Dawn = new User({ _id: new mongoose.Types.ObjectId(), username: 'darkestdawn', password: password, hash: hash1 })
// // Dawn.save(function (err) {
// //   if (err) return handleError(err)
// // })
// // //console.log(Dawn)

// var Sun = new User({ 
//   _id: new mongoose.Types.ObjectId(),
//   name: 'Sun Goes Down', 
//   username: 'sungoesdownblabla',
//   email: 'sungoesdown@gmail.com', 
//   password: password, hash: hash2 })
// Sun.save()
// console.log(Sun)

// User.find({ age: 20 })
//   .exec((err, users) => {
//     if (err) {
//       console.log({ message: err.message });
//     }
//     console.log(users[0].username)
//   })

