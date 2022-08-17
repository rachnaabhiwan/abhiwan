const router = require("express").Router()
const controller = require("../controller/gameController")
const auth = require("../Middleware/auth").authCustomer

//Friends
router.post("/friends", controller.friends)

router.get("/getfriend", controller.getfriend)
router.get("/getall", controller.getall)
router.get("/userStatus", controller.userStatus)



//userstat

router.post('/userstats', controller.userStats)
router.get('/userprofile', controller.userprofile)





module.exports = router









