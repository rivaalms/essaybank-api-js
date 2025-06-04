const express = require("express")

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

module.exports = router