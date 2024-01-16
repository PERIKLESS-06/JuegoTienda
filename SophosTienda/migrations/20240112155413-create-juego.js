'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Juegos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Descripcion: {
        type: Sequelize.STRING
      },
      Protagonista: {
        type: Sequelize.STRING
      },
      Precio: {
        type: Sequelize.DECIMAL
      },
      Director: {
        type: Sequelize.STRING
      },
      Productor: {
        type: Sequelize.STRING
      },
      Plataforma: {
        type: Sequelize.STRING
      },
      FechaLanzamiento: {
        type: Sequelize.STRING
      },
      Imagen: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Juegos');
  }
};