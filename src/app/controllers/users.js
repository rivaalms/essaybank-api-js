const { paginate, parseResponse } = require("../helpers/http")
const { User } = require("../models")
const crypt = require("../helpers/crypt")

module.exports = {
   async get(req, res) {
      const data = await paginate(User, req.query.page, req.query.perPage)
      res.json(parseResponse({ data }))
   },
   async find(req, res) {
      const data = await User.findByPk(req.params.id)
      res.json(parseResponse({ data }))
   },
   async create(req, res) {
      const payload = {
         name: req.body.name,
         email: req.body.email,
         password: await crypt.hash(req.body.password),
         role: req.body.role,
      }

      try {
         const result = await User.create(payload)
         res.json(
            parseResponse({
               data: result,
               message: "User created successfully",
            })
         )
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to create user",
            })
         )
      }
   },
   async update(req, res) {
      const model = await User.findByPk(req.params.id)
      const payload = {
         name: req.body.name,
         email: req.body.email,
         role: req.body.role,
      }

      try {
         const result = await model.update(payload)
         res.json(
            parseResponse({
               data: result,
               message: "User updated successfully",
            })
         )
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to update user",
            })
         )
      }
   },
   async destroy(req, res) {
      const model = await User.findByPk(req.params.id)
      try {
         await model.destroy()
         res.json(parseResponse({ message: "User deleted successfully" }))
      } catch (e) {
         res.json(
            parseResponse({
               data: e.toString(),
               error: "Failed to delete user",
            })
         )
      }
   },
}
