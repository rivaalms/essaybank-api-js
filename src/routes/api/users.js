const express = require("express")
const controller = require("../../app/controllers/users")

const router = express.Router()

router.get("/", controller.get)
router.get("/:id", controller.find)
router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.destroy)

module.exports = router