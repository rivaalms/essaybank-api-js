const bcrypt = require("bcrypt")
const crypto = require("crypto")

module.exports = {
   async hash(password) {
      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(password, salt)
      return hash
   },
   async compare(password, hash) {
      return await bcrypt.compare(password, hash)
   },
   async genToken(bytes = 32) {
      return crypto.randomBytes(bytes).toString("hex")
   }
}