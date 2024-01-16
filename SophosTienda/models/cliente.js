'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cliente.init({
    TipoDocumento: DataTypes.STRING,
    NumeroDocumento: DataTypes.STRING,
    Nombres: DataTypes.STRING,
    Apellidos: DataTypes.STRING,
    Email: DataTypes.STRING,
    Telefono: DataTypes.STRING,
    Edad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};