"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class Response extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         this.belongsTo(models.Question, { foreignKey: "questionId" })
         this.hasMany(models.Review, { foreignKey: "responseId" })
      }
   }
   Response.init(
      {
         questionId: {
            allowNull: false,
            references: {
               model: "Questions",
               key: "id",
            },
            type: DataTypes.INTEGER,
         },
         identifier: {
            type: DataTypes.STRING,
         },
         responseText: {
            allowNull: false,
            type: DataTypes.TEXT,
         },
         flagged: {
            allowNull: false,
            type: DataTypes.BOOLEAN
         }
      },
      {
         sequelize,
         modelName: "Response",
      }
   )
   return Response
}
