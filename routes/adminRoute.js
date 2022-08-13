const express = require('express')
const router = express.Router()
const controller = require('../controller/admincontroller')
// const User = require('../models/userModel')


router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.get('/userstat', controller.userStat)










module.exports = router