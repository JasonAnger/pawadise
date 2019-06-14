const mongoose = require('mongoose')
const Schema = mongoose.Schema

//mongoose.connect('mongodb://localhost/pawadise',{ useNewUrlParser: true })

const storeSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  //Storing some basic information of user
  name: {type: String, default: ''},
  avatar: {type: String, default: ''},
  address: {
    street: {type: String, default: ''},
    district: {type: String, default: ''},
    city: {type: String, default: ''}
  },
  phoneNumber: {type: String, default: ''},
  //Type of Store: Pet Care? Pet Cafe? Pet Shop?
  storeType: {type: String, default: ''},
  //Store Owner is also a user but have a medal to improve that this user is a store owner
  storeOwner: {type: mongoose.Types.ObjectId, default: null}
})

const Store = mongoose.model('Store', storeSchema, 'stores')

// var newStore = new Store({_id: new mongoose.Types.ObjectId(), name:'AloALo', phoneNumber:'0923712039'})
// newStore.save(function (err) {
//   if (err) return handleError(err)
// })
// console.log(newStore)


module.exports = Store