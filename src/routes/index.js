const express = require("express")
const { parseResponse } = require("../app/helpers/http")
const userRouter = require("./api/users")
const questionRouter = require("./api/questions")
const responseRouter = require("./api/responses")

const router = express.Router({ mergeParams: true })

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.use((req, res, next) => {
   if (req.header("accept") !== "application/json") {
      res.status(406).json(parseResponse({ error: "Not acceptable" }))
      return
   }
   next()
})

router.use("/users", userRouter)
router.use("/questions", questionRouter)
router.use("/responses", responseRouter)

module.exports = router
