const { paginate, parseResponse } = require("../helpers/http")
const { Review } = require("../models")

module.exports = {
   async get(req, res) {
      const data = await paginate(Review, req.query.page, req.query.perPage)
      res.json(parseResponse({ data }))
   },
   async find(req, res) {
      const data = await Review.findByPk(req.params.id)
      res.json(parseResponse({ data }))
   },
   async create(req, res) {
      const payload = {
         responseId: req.body.responseId,
         reviewerId: req.body.reviewerId,
         relevanceScore: req.body.relevanceScore,
         languageScore: req.body.languageScore,
         spellingScore: req.body.spellingScore,
         totalScore:
            (Number(req.body.relevanceScore) +
               Number(req.body.languageScore) +
               Number(req.body.spellingScore)) /
            3,
      }

      try {
         const result = await Review.create(payload)
         res.json(
            parseResponse({
               data: result,
               message: "Review created successfully",
            })
         )
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to create review",
            })
         )
      }
   },
   async update(req, res) {
      const model = await Review.findByPk(req.params.id)
      const payload = {
         responseId: req.body.responseId,
         reviewerId: req.body.reviewerId,
         relevanceScore: req.body.relevanceScore,
         languageScore: req.body.languageScore,
         spellingScore: req.body.spellingScore,
         totalScore:
            (Number(req.body.relevanceScore) +
               Number(req.body.languageScore) +
               Number(req.body.spellingScore)) /
            3,
      }

      try {
         const result = await model.update(payload)
         res.json(
            parseResponse({
               data: result,
               message: "Review updated successfully",
            })
         )
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to update review",
            })
         )
      }
   },
   async destroy(req, res) {
      const model = await Review.findByPk(req.params.id)
      try {
         await model.destroy()
         res.json(parseResponse({ message: "Review deleted successfully" }))
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to delete review",
            })
         )
      }
   },
}
