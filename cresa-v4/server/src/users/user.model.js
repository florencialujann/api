const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    userId: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: false },
    password: { type: String },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    dni: { type: String, unique: true },
    phone: { type: Number },
    name: { type: String },
    surname: { type: String },
    emailToken: { type: String, default: null },
    emailTokenExpires: { type: Date, default: null },

    accessToken: { type: String, default: null }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

const User = mongoose.model('user', userSchema)
module.exports = User

module.exports.hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error('Hashing failed', error)
  }
}
module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword)
  } catch (error) {
    throw new Error('Comparison failed', error)
  }
}
