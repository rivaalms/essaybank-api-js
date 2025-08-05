const { parseResponse } = require("../helpers/http")
const { Question, Response, Review } = require("../models")

module.exports = {
   async counts(req, res) {
      const data = {
         questions: await Question.count(),
         responses: await Response.count(),
         reviews: await Review.count(),
         respondents: await Response.count({
            distinct: true,
            col: "identifier"
         })
      }

      res.json(parseResponse({ data }))
   }
}