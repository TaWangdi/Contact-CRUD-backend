'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add columns to Users table
    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove columns in case of rollback
    await queryInterface.removeColumn('Users', 'username');
    await queryInterface.removeColumn('Users', 'email');
    await queryInterface.removeColumn('Users', 'password');
  }
};
