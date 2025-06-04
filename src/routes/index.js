const express = require("express")
const userRouter = require("./api/users")
const questionRouter = require("./api/questions")

const router = express.Router({ mergeParams: true })

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.use((req, res, next) => {
   if (req.header("accept") !== "application/json") {
      res.status(406).json({ error: "Not acceptable" })
      return
   }
   next()
})

router.use("/users", userRouter)
router.use("/questions", questionRouter)

module.exports = router