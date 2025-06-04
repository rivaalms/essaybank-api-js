"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class Review extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         this.belongsTo(models.User, { foreignKey: "reviewerId" })
         this.belongsTo(models.Response, { foreignKey: "responseId" })
      }
   }
   Review.init(
      {
         reviewerId: {
            allowNull: false,
            references: {
               model: "Users",
               key: "id",
            },
            type: DataTypes.INTEGER,
         },
         responseId: {
            allowNull: false,
            references: {
               model: "Responses",
               key: "id",
            },
            type: DataTypes.INTEGER,
         },
         relevanceScore: {
            allowNull: false,
            type: DataTypes.DECIMAL(5, 2),
         },
         languageScore: {
            allowNull: false,
            type: DataTypes.DECIMAL(5, 2),
         },
         spellingScore: {
            allowNull: false,
            type: DataTypes.DECIMAL(5, 2),
         },
         totalScore: {
            allowNull: false,
            type: DataTypes.DECIMAL(5, 2),
         },
      },
      {
         sequelize,
         modelName: "Review",
      }
   )
   return Review
}
