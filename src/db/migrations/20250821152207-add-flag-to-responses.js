"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction((t) => {
         return Promise.all([
            queryInterface.addColumn(
               "Responses",
               "flagged",
               {
                  type: Sequelize.DataTypes.BOOLEAN,
               },
               { transaction: t }
            ),
         ])
      })
   },

   async down(queryInterface, Sequelize) {
      return queryInterface.sequelize.transaction((t) => {
         return Promise.all([
            queryInterface.removeColumn("Responses", "flagged", {
               transaction: t,
            }),
         ])
      })
   },
}
