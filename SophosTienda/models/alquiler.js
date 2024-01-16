'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alquiler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Alquiler.belongsTo(models.Cliente, {
        foreignKey: "cliente_id", 
        targetKey: 'id'
      });

      Alquiler.belongsTo(models.Juego, {
        foreignKey: "juego_id", 
        targetKey: 'id' 
      });

    }
  }
  Alquiler.init({
    cliente_id: DataTypes.INTEGER,
    juego_id: DataTypes.INTEGER,
    FechaAlquiler: DataTypes.DATE,
    FechaEntrega: DataTypes.DATE,
    Precio: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Alquiler',
  });
  return Alquiler;
};