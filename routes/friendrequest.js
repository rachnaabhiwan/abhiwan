const router = require("express").Router()
const controller = require("../controller/friendrequestcontroller")
const auth = require("../Middleware/auth").authCustomer

router.post("/friends", controller.friends)

router.get("/getfriend", controller.getfriend)
router.get("/getall", controller.getall)
router.get("/userStatus", controller.userStatus)




module.exports = router









