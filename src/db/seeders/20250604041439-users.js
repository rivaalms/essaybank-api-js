"use strict"
const crypt = require("../../app/helpers/crypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("Users", [
         {
            name: "Admin",
            email: "admin@example.com",
            password: await crypt.hash("password"),
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            name: "Reviewer",
            email: "reviewer@example.com",
            password: await crypt.hash("password"),
            role: "reviewer",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ])
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("Users", null, {})
   },
}
