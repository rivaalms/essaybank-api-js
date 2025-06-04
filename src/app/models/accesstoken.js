"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class AccessToken extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         this.belongsTo(models.User, { foreignKey: "userId" })
      }
   }
   AccessToken.init(
      {
         userId: {
            allowNull: false,
            references: {
               model: "Users",
               key: "id",
            },
            type: DataTypes.INTEGER,
         },
         token: {
            allowNull: false,
            type: DataTypes.STRING,
         },
         expiresAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day,
         },
      },
      {
         sequelize,
         modelName: "AccessToken",
      }
   )
   return AccessToken
}
