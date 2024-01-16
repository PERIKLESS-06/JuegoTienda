'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Juego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Juego.init({
    Nombre: DataTypes.STRING,
    Descripcion: DataTypes.STRING,
    Protagonista: DataTypes.STRING,
    Precio: DataTypes.DECIMAL,
    Director: DataTypes.STRING,
    Productor: DataTypes.STRING,
    Plataforma: DataTypes.STRING,
    FechaLanzamiento: DataTypes.STRING,
    Imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Juego',
  });
  return Juego;
};