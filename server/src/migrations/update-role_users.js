module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "role", {
      type: Sequelize.ENUM("1", "2", "3"),
      defaultValue: "3",
    });
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn("Users", "role");
  },
};
