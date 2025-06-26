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
   async paginate(model, page = 1, perPage = 10, opts = {}) {
      const offset = Number((page - 1) * perPage)
      const limit = Number(perPage)

      try {
         const data = await model.findAndCountAll({
            offset,
            limit,
            include: opts.include
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
