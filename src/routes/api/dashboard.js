const express = require("express")
const controller =  require("../../app/controllers/dashboard")

const router = express.Router()

router.get("/counts", controller.counts)

module.exports = router