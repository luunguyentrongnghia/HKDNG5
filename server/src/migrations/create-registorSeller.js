"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("registor_sellers", {
      idregistor_seller: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shop_name: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true,
      },
      reason: {
        type: Sequelize.STRING,
      },
      Image_shop: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kind_shop: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_user: {
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
    await queryInterface.dropTable("registor_sellers");
  },
};
