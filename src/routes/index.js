const express = require("express")
const { parseResponse } = require("../app/helpers/http")
const authRouter = require("./api/auth")
const userRouter = require("./api/users")
const questionRouter = require("./api/questions")
const responseRouter = require("./api/responses")
const reviewRouter = require("./api/reviews")
const cors = require('cors')

const router = express.Router({ mergeParams: true })

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.use(cors({
   origin: (origin, callback) => {
      const allowedOrigins = [
         'http://localhost:3000',
         'http://103.63.24.166:3088'
      ]
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
         callback(null, true)
      } else {
         callback(new Error("Not allowed by CORS"))
      }
   }
}))

router.use((req, res, next) => {
   if (req.header("accept") !== "application/json") {
      res.status(406).json(parseResponse({ error: "Not acceptable" }))
      return
   }
   next()
})

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/questions", questionRouter)
router.use("/responses", responseRouter)
router.use("/reviews", reviewRouter)

module.exports = router
