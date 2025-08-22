const { paginate, parseResponse } = require("../helpers/http")
const { Response } = require("../models")
const { fn, col, literal } = require("sequelize")

module.exports = {
   async get(req, res) {
      const opts = {
         include: "Question",
         attributes: {
            include: [
               [
                  literal(
                     `EXISTS (SELECT 1 from Reviews WHERE Reviews.responseId = Response.id)`
                  ),
                  "hasReview",
               ],
            ],
         },
      }

      if (req.headers.identifier && !req.headers.authorization) {
         opts.where = {
            identifier: req.headers.identifier,
         }
      }

      const data = await paginate(
         Response,
         req.query.page,
         req.query.perPage,
         opts
      )
      res.json(parseResponse({ data }))
   },

   async find(req, res) {
      const data = await Response.findByPk(req.params.id, {
         include: "Question",
         attributes: {
            include: [
               [
                  literal(
                     `EXISTS (SELECT 1 from Reviews WHERE Reviews.responseId = Response.id)`
                  ),
                  "hasReview",
               ],
            ],
         },
      })
      res.json(parseResponse({ data }))
   },

   async create(req, res) {
      const payload = {
         questionId: req.body.questionId,
         responseText: req.body.responseText,
         identifier: req.body.ip || req.ip,
      }

      try {
         const result = await Response.create(payload)
         res.json(
            parseResponse({
               data: result,
               message: "Response created successfully",
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
      const model = await Response.findByPk(req.params.id)
      const payload = {
         questionId: req.body.questionId,
         responseText: req.body.responseText,
      }

      try {
         const result = await model.update(payload)
         res.json(
            parseResponse({
               data: result,
               message: "Response updated successfully",
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

   async flag(req, res) {
      const model = await Response.findByPk(req.params.id)
      const payload = {
         flagged: req.body.flagged,
      }

      try {
         const result = await model.update(payload)
         res.json(
            parseResponse({
               data: result,
               message: "Response updated successfully",
            })
         )
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to update response",
            })
         )
      }
   },

   async destroy(req, res) {
      const model = await Response.findByPk(req.params.id)
      try {
         await model.destroy()
         res.json(parseResponse({ message: "Response deleted successfully" }))
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
