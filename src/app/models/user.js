"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         this.hasMany(models.Review, { foreignKey: "reviewerId" })
      }
   }
   User.init(
      {
         name: {
            allowNull: false,
            type: DataTypes.STRING,
         },
         email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
         },
         password: {
            allowNull: false,
            type: DataTypes.STRING,
         },
         role: {
            allowNull: false,
            type: DataTypes.ENUM("admin", "reviewer"),
            defaultValue: "reviewer",
         },
      },
      {
         sequelize,
         modelName: "User",
         defaultScope: {
            attributes: { exclude: ["password"] },
         },
      }
   )
   return User
}
