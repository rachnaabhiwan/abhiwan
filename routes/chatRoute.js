const router = require('express').Router()
const controller = require('../controller/chatcontroller')

router.post('/user', controller.message)
router.get('/', controller.message1)


module.exports = router