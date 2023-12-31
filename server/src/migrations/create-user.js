"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      SDT: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      Address: {
        type: Sequelize.STRING,
      },
      Passwords: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otp: {
        type: Sequelize.INTEGER,
      },
      imgUS: {
        type: Sequelize.STRING,
      },
      thongTinThanhToan: {
        type: Sequelize.STRING,
      },
      refreshToken: {
        type: Sequelize.STRING,
      },
      passwordChangedAt: {
        type: Sequelize.STRING,
      },
      passwordResetToken: {
        type: Sequelize.STRING,
      },
      passwordResetExpires: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
