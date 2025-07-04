"use strict"
let data = require("./.data/questions.json")

data = data.map((item) => {
   return {
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
   }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("Questions", data)
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("Questions", null, {})
   },
}
