"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Reviews", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         reviewerId: {
            allowNull: false,
            references: {
               model: "Users",
               key: "id",
            },
            type: Sequelize.INTEGER,
         },
         responseId: {
            allowNull: false,
            references: {
               model: "Responses",
               key: "id",
            },
            type: Sequelize.INTEGER,
         },
         relevanceScore: {
            allowNull: false,
            type: Sequelize.DECIMAL(5, 2),
         },
         languageScore: {
            allowNull: false,
            type: Sequelize.DECIMAL(5, 2),
         },
         spellingScore: {
            allowNull: false,
            type: Sequelize.DECIMAL(5, 2),
         },
         totalScore: {
            allowNull: false,
            type: Sequelize.DECIMAL(5, 2),
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
      await queryInterface.dropTable("Reviews")
   },
}
