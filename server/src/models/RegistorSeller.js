"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RegistorSeller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RegistorSeller.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "User",
      });
    }
  }
  RegistorSeller.init(
    {
      idregistor_seller: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shop_name: DataTypes.STRING,
      reason: DataTypes.STRING,
      Image_shop: DataTypes.STRING,
      Address: DataTypes.STRING,
      kind_shop: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "registor_seller",
    }
  );
  return RegistorSeller;
};
