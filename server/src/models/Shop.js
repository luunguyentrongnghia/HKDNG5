"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shop.belongsTo(models.User, {
        foreignKey: "id_user",
        as: "User",
      });
      Shop.hasMany(models.product, {
        foreignKey: "id_shop",
        as: "shop",
      });
    }
  }
  Shop.init(
    {
      shop_name: DataTypes.STRING,
      Image_shop: DataTypes.STRING,
      Address: DataTypes.STRING,
      kind_shop: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "shop",
    }
  );
  return Shop;
};
