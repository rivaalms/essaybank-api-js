"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class Question extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         this.hasMany(models.Response, { foreignKey: "questionId" })
      }
   }
   Question.init(
      {
         questionText: {
            allowNull: false,
            type: DataTypes.TEXT,
         },
         referenceAnswer: {
            allowNull: false,
            type: DataTypes.TEXT,
         },
      },
      {
         sequelize,
         modelName: "Question",
      }
   )
   return Question
}
