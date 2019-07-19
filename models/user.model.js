const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = Schema({
  //Using in posts,
  _id: Schema.Types.ObjectId,
  //Username to login
  username: { type: String, unique: true, trim: true, required: true },
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
  address: {
    street: { type: String, trim: true, default: '' },
    district: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  phoneNumber: { type: String, default: ''},
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
  }],
  avatar: { type: String, required: true, default: 'public/avatar/default.png' },
  notifications: [{
    body: String,
    //photo: Buffer,
    date: { type: Date, default: Date.now }
  }]
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  userObject.avatar=userObject.avatar.replace('\\', '/').replace('\\', '/')
  delete userObject.password
  delete userObject.tokens
  delete userObject.hash
  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}


const User = mongoose.model('User', userSchema, 'users')

module.exports = User

