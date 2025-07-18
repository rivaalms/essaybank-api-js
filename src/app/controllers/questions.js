const { paginate, parseResponse } = require("../helpers/http")
const { Question } = require("../models")
const { Op } = require("sequelize")
const { validateToken } = require("../helpers/http")

module.exports = {
   async get(req, res) {
      let where = {}
      if (req.query.search && req.query.search.length > 0) {
         where = {
            questionText: {
               [Op.like]: `%${req.query.search}%`,
            },
         }
      }

      const data = await paginate(Question, req.query.page, req.query.perPage, {
         where,
      })

      // NOTE - If the user is not authenticated, we should not return the referenceAnswer
      if (
         !req.headers.authorization ||
         !(await validateToken(req.headers.authorization.split(" ")[1]))
      ) {
         data.data.forEach((item) => {
            delete item.dataValues.referenceAnswer
         })
      }

      res.json(parseResponse({ data }))
   },
   async find(req, res) {
      const data = await Question.findByPk(req.params.id)
      if (
         !req.headers.authorization ||
         !(await validateToken(req.headers.authorization.split(" ")[1]))
      ) {
         delete data.dataValues.referenceAnswer
      }
      res.json(parseResponse({ data }))
   },
   async create(req, res) {
      const payload = {
         questionText: req.body.questionText,
         referenceAnswer: req.body.referenceAnswer,
      }

      try {
         const result = await Question.create(payload)
         res.json(
            parseResponse({
               data: result,
               message: "Question created successfully",
            })
         )
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to create question",
            })
         )
      }
   },
   async update(req, res) {
      const model = await Question.findByPk(req.params.id)
      const payload = {
         questionText: req.body.questionText,
         referenceAnswer: req.body.referenceAnswer,
      }

      try {
         const result = await model.update(payload)
         res.json(
            parseResponse({
               data: result,
               message: "Question updated successfully",
            })
         )
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to update question",
            })
         )
      }
   },
   async destroy(req, res) {
      const model = await Question.findByPk(req.params.id)
      try {
         await model.destroy()
         res.json(parseResponse({ message: "Question deleted successfully" }))
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to delete question",
            })
         )
      }
   },
}
