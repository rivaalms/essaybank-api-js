module.exports = {
   parseResponse({ data, message, error }) {
      return {
         meta: {
            success: !error,
            error: error ?? "",
            message: message ?? "",
         },
         data: data
      }
   },
   async paginate(model, page = 1, perPage = 10) {
      const offset = Number((page - 1) * perPage)
      const limit = Number(perPage)

      try {
         const data = await model.findAndCountAll({
            offset,
            limit,
         })

         return {
            page: Number(page),
            perPage: Number(perPage),
            total: data.count,
            data: data.rows,
         }
      } catch (e) {
         console.error("Pagination error:", e)
         throw new Error("Failed to paginate data")
      }
   },
}
