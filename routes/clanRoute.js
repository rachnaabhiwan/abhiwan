const router = require("express").Router()
const controller = require("../controller/clanController")

router.post("/join", controller.join)
router.get("/getdata", controller.getdata)





module.exports = router