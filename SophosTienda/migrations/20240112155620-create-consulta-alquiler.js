'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConsultaAlquilers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alquiler_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Alquilers',
          key: 'id'
        },
      },
      FechaEntrega: {
        type: Sequelize.DATE
      },
      Balance: {
        type: Sequelize.DECIMAL
      },
      JuegosAlquilados: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ConsultaAlquilers');
  }
};