const express = require('express')
const router = express.Router()
const controller = require('../controller/usercontroller')
// const User = require('../models/userModel')


router.post('/signup', controller.signup)
router.post('/login', controller.login)










module.exports = router