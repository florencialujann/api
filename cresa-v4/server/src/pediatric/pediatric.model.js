const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pediatric = new Schema({
  children: { type: String, required: true },
  dateofrecord: { type: Date, require: true },
  weight: { type: Number, require: true },
  height: { type: Number, require: true },
  headdiameter: { type: Number, require: false },
  observations: { type: String, require: true },
  prescriptiondrug: { type: String, require: true },
  medicalstudies: { type: String, require: true },
  results: { type: String, require: true },
  userId: { type: String, required: true }
})

const Pediatric = mongoose.model('pediatric', pediatric)
module.exports = Pediatric
