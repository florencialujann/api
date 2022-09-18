const Joi = require('joi')
require('dotenv').config()
const { v4: uuid } = require('uuid')
const { customAlphabet: generate } = require('nanoid')

const { generateJwt } = require('./helpers/generateJwt')
const { sendEmail } = require('./helpers/mailer')
const User = require('./user.model')

const CHARACTER_SET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

//Validate user schema
const userSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string()
    .required()
    .min(4),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  dni: Joi.string().required(),
  phone: Joi.number()
})

exports.Signup = async (req, res) => {
  try {
    const result = userSchema.validate(req.body)
    if (result.error) {
      console.log(result.error.message)
      return res.json({
        error: true,
        status: 400,
        message: result.error.message
      })
    }

    //Check if the email has been already registered.
    var user = await User.findOne({
      email: result.value.email
    })

    if (user) {
      return res.json({
        error: true,
        message: 'Email is already in use'
      })
    }

    const hash = await User.hashPassword(result.value.password)

    //Generate unique id for the user.
    const id = uuid()

    result.value.userId = id
    result.value.password = hash

    const newUser = new User(result.value)
    await newUser.save()

    return res.status(200).json({
      success: true,
      message: 'Registration Success'
    })
  } catch (error) {
    console.error('signup-error', error)
    return res.status(500).json({
      error: true,
      message: 'Cannot Register'
    })
  }
}

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.decoded

    let user = await User.findOne({ userId: id })
    if (!user) {
      return res.status(400).json({
        error: true,
        message: 'Please logout & Login again'
      })
    }
    return res.send({
      success: true,
      message: 'success',
      user: user
    })
  } catch (error) {
    console.error('user-logout-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Cannot authorize user.'
      })
    }

    //1. Find if any account with that email exists in DB
    const user = await User.findOne({ email: email })

    // NOT FOUND - Throw error
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Account not found'
      })
    }

    //3. Verify the password is valid
    const isValid = await User.comparePasswords(password, user.password)

    if (!isValid) {
      return res.status(400).json({
        error: true,
        message: 'Invalid credentials'
      })
    }

    //Generate Access token

    const { error, token } = await generateJwt(user.email, user.userId)
    console.log('err', error)
    if (error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't create access token. Please try again later"
      })
    }
    user.accessToken = token
    await user.save()

    //Success
    return res.send({
      success: true,
      message: 'User logged in successfully',
      accessToken: token
    })
  } catch (err) {
    console.error('Login error', err)
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later."
    })
  }
}

exports.ForgotPassword = async (req, res) => {
  try {
    const { email, link } = req.body
    console.log('link', link)
    if (!email) {
      return res.send({
        status: 400,
        error: true,
        message: 'Cannot be processed'
      })
    }
    const user = await User.findOne({
      email: email
    })
    if (!user) {
      return res.send({
        success: true,
        message:
          'If that email address is in our database, we will send you an email to reset your password'
      })
    }

    let code = Math.floor(100000 + Math.random() * 900000)
    let response = await sendEmail(user.email, code, link)

    if (response.error) {
      return res.status(500).json({
        error: true,
        message: "Couldn't send mail. Please try again later."
      })
    }

    let expiry = Date.now() + 60 * 1000 * 15
    user.resetPasswordToken = code
    user.resetPasswordExpires = expiry // 15 minutes

    await user.save()

    return res.send({
      success: true,
      message:
        'If that email address is in our database, we will send you an email to reset your password'
    })
  } catch (error) {
    console.error('forgot-password-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}

exports.ResetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body
    console.log({ token, newPassword, confirmPassword })
    if (!token || !newPassword || !confirmPassword) {
      return res.status(403).json({
        error: true,
        message: "Couldn't process request. Please provide all mandatory fields"
      })
    }
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() }
    })
    if (!user) {
      return res.send({
        error: true,
        message: 'Password reset token is invalid or has expired.'
      })
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "Passwords didn't match"
      })
    }
    const hash = await User.hashPassword(req.body.newPassword)
    user.password = hash
    user.resetPasswordToken = null
    user.resetPasswordExpires = ''

    await user.save()

    return res.send({
      success: true,
      message: 'Password has been changed'
    })
  } catch (error) {
    console.error('reset-password-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}

exports.update = async (req, res) => {
  const userSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    dni: Joi.string().required(),
    phone: Joi.number().required()
  })
  try {
    const result = userSchema.validate(req.body)
    if (result.error) {
      console.log(result.error.message)
      return res.json({
        error: true,
        status: 400,
        message: result.error.message
      })
    }

    //Check if the email has been already registered.
    let user = await User.findOne({
      email: result.value.email
    })
    user.name = result.value.name
    user.surname = result.value.surname
    user.dni = result.value.dni
    user.phone = result.value.phone
    console.log({ user })

    console.log({ result })
    const resss = await user.save()
    console.log({ resss })

    return res.send({
      success: true,
      message: 'Succefully Updated'
    })
  } catch (error) {
    console.error('profile-update-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}

exports.Logout = async (req, res) => {
  try {
    const { id } = req.decoded

    let user = await User.findOne({ userId: id })

    user.accessToken = ''

    await user.save()

    return res.send({ success: true, message: 'User Logged out' })
  } catch (error) {
    console.error('user-logout-error', error)
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
}
