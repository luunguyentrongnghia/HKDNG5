"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SanPham.hasMany(models.CartList, {
        foreignKey: "maSP",
        as: "Carts",
      });
      SanPham.belongsTo(models.User, {
        foreignKey: "UID",
        as: "SanPham",
      });
    }
  }
  SanPham.init(
    {
      ten: DataTypes.STRING,
      mota: DataTypes.STRING,
      img: DataTypes.STRING,
      gia: DataTypes.INTEGER,
      loai: DataTypes.STRING,
      soluongban: DataTypes.INTEGER,
      daBan: DataTypes.INTEGER,
      UID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SanPham",
    }
  );
  return SanPham;
};
