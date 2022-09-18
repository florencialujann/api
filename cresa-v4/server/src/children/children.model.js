const mongoose = require('mongoose')
const Schema = mongoose.Schema

const children = new Schema({
  name: { type: String, require: true },
  dateofbirth: { type: Date, require: true },
  gender: { type: String, require: true },
  userId: { type: String, required: true },
  chronicdieses:{type:String,required:true},
  bloodgroup:{type:String,required:true}
})

const Children = mongoose.model('children', children)
module.exports = Children
