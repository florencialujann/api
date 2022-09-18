const express = require('express')
const router = express.Router()

const cleanBody = require('../middlewares/cleanbody')
const { validateToken } = require('../middlewares/validateToken')

const AuthController = require('../src/users/user.controller')

router.post('/signup', cleanBody, AuthController.Signup)
router.post('/login', cleanBody, AuthController.Login)
router.patch('/forgot', cleanBody, AuthController.ForgotPassword)
router.patch('/reset', cleanBody, AuthController.ResetPassword)
router.get('/logout', validateToken, AuthController.Logout)
router.get('/profile', validateToken, AuthController.getProfile)
router.patch('/update', validateToken, AuthController.update)

module.exports = router
