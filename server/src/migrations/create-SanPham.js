"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SanPhams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ten: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      mota: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gia: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      loai: {
        type: Sequelize.STRING,
      },
      soluongban: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      daBan: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      UID: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("SanPhams");
  },
};
