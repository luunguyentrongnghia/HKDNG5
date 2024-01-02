"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartList.belongsTo(models.User, {
        foreignKey: "uid",
        as: "cart",
      });
    }
  }
  CartList.init(
    {
      maSP: DataTypes.INTEGER,
      status: DataTypes.STRING,
      uid: DataTypes.INTEGER,
      soLuongMua: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartList",
    }
  );
  return CartList;
};
