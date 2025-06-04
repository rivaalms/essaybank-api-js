const { parseResponse } = require("../../app/helpers/http")
const { AccessToken } = require("../../app/models")

module.exports = async (req, res, next) => {
   try {
      if (!req.header("authorization")) {
         res.status(401).json(parseResponse({ error: "Unauthorized" }))
         return
      }
      const token = req.header("authorization").split(" ")[1]
      if (!token) {
         res.status(401).json(parseResponse({ error: "Unauthorized" }))
         return
      }
      const storedToken = await AccessToken.findOne({ where: { token } })
      if (!storedToken || storedToken.getDataValue("expiresAt") < new Date()) {
         res.status(401).json(parseResponse({ error: "Unauthorized" }))
         return
      }
      next()
   } catch (e) {
      res.status(500).json(
         parseResponse({
            error: "Internal server error",
            data: { error: e.toString(), location: __dirname },
         })
      )
   }
}
