'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alquilers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id'
        },
      },
      juego_id: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        references: {
          model: 'Juegos',
          key: 'id'
        },
      },
      FechaAlquiler: {
        type: Sequelize.DATE
      },
      FechaEntrega: {
        type: Sequelize.DATE
      },
      Precio: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Alquilers');
  }
};