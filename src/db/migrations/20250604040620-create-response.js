"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Responses", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         questionId: {
            allowNull: false,
            references: {
               model: "Questions",
               key: "id",
            },
            type: Sequelize.INTEGER,
         },
         identifier: {
            type: Sequelize.STRING,
         },
         responseText: {
            allowNull: false,
            type: Sequelize.TEXT,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      })
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Responses")
   },
}
