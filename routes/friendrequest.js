const router = require("express").Router()
const controller = require("../controller/friendrequestcontroller")

router.post("/user",controller.adduser)
router.get("/", controller.user)
router.post("/update", controller.accept)
router.post("/reject", controller.reject)
router.post("/block", controller.block)







module.exports = router