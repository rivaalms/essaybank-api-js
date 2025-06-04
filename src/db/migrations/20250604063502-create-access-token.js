"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("AccessTokens", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         userId: {
            allowNull: false,
            references: {
               model: "Users",
               key: "id"
            },
            type: Sequelize.INTEGER,
         },
         token: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         expiresAt: {
            allowNull: false,
            type: Sequelize.DATE,
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
      await queryInterface.dropTable("AccessTokens")
   },
}
