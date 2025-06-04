"use strict"
const faker = require("../../app/helpers/faker")

const data = []

for (let i = 0; i < 10; i++) {
   data.push({
      questionText: faker.lorem.sentence(),
      referenceAnswer: faker.lorem.sentence(),
      createdAt: new Date(),
      updatedAt: new Date(),
   })
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("Questions", data)
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("Questions", null, {})
   },
}
