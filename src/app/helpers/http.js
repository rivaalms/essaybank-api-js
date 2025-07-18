const { AccessToken } = require("../models")

module.exports = {
   parseResponse({ data, message, error }) {
      return {
         meta: {
            success: !error,
            error: error ?? "",
            message: message ?? "",
         },
         data: data ?? null
      }
   },
   async paginate(model, page = 1, perPage = -1, opts = {}) {
      const offset = Number((page - 1) * perPage)
      const limit = perPage > 0 ? Number(perPage) : undefined

      try {
         const data = await model.findAndCountAll({
            offset,
            limit,
            ...opts
         })

         return {
            page: Number(page),
            perPage: perPage > 0 ? Number(perPage) : data.count,
            total: data.count,
            data: data.rows,
         }
      } catch (e) {
         console.error("Pagination error:", e)
         throw new Error("Failed to paginate data")
      }
   },
   async validateToken(token) {
      try {
         const storedToken = await AccessToken.findOne({ where: { token } })
         if (!storedToken || storedToken.getDataValue("expiresAt") < new Date()) {
            return false
         }
         return true
      } catch (e) {
         console.error("Token validation error:", e)
         throw new Error("Failed to validate token")
      }
   }
}
