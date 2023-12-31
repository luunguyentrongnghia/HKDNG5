"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.CartList, {
        foreignKey: "uid",
        as: "cart",
      });
      User.hasMany(models.SanPham, {
        foreignKey: "UID",
        as: "SanPham",
      });
      User.hasOne(models.registor_seller, {
        foreignKey: "id_user",
        as: "registorSeller",
      });
      User.hasOne(models.shop, {
        foreignKey: "id_user",
        as: "shop",
      });
    }
  }
  User.init(
    {
      Name: DataTypes.STRING,
      email: DataTypes.STRING,
      SDT: DataTypes.STRING,
      Passwords: DataTypes.STRING,
      Address: DataTypes.STRING,
      otp: DataTypes.STRING,
      imgUS: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
      passwordChangedAt: DataTypes.STRING,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.STRING,
      thongTinThanhToan: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
