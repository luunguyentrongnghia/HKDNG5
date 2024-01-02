"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.shop, {
        foreignKey: "id_shop",
        as: "shop",
      });
      Product.belongsTo(models.category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Product.init(
    {
      product_name: DataTypes.STRING,
      product_decs: DataTypes.STRING,
      product_image: DataTypes.STRING,
      product_price: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      product_numbersell: DataTypes.INTEGER,
      product_selled: DataTypes.INTEGER,
      id_shop: DataTypes.INTEGER,
      product_review: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product",
      tableName: "product",
    }
  );
  return Product;
};
