const { parseResponse } = require("../helpers/http")
const crypt = require("../helpers/crypt")
const { User, AccessToken } = require("../models")

module.exports = {
   async login(req, res) {
      try {
         const user = await User.unscoped().findOne({
            where: { email: req.body.email },
         })
         if (!user) {
            res.status(401).json(
               parseResponse({
                  error: "Your credentials does not match our records",
               })
            )
            return
         }

         if (
            await crypt.compare(
               req.body.password,
               user.getDataValue("password")
            )
         ) {
            const token = await crypt.genToken()
            const result = await AccessToken.create({
               userId: user.getDataValue("id"),
               token,
            })
            delete user.dataValues.password
            delete user.password

            res.json(
               parseResponse({
                  data: {
                     user,
                     token: {
                        value: result.getDataValue("token"),
                        expiresAt: result.getDataValue("expiresAt"),
                     },
                  },
                  message: "Login successful",
               })
            )
         } else {
            res.status(401).json(
               parseResponse({
                  error: "Your credentials does not match our records",
               })
            )
         }
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to login",
            })
         )
         throw new Error("Failed to login", { cause: e })
      }
   },
}
