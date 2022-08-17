const router = require("express").Router()
const controller = require("../controller/clanController")

// Clan Route
router.post("/join", controller.join)
router.get("/getdata", controller.getdata)

module.exports = router

