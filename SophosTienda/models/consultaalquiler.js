'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConsultaAlquiler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ConsultaAlquiler.belongsTo( models.Alquiler, {
        foreignKey:"alquiler_id",
        targetKey:'id'
      });
    }
  }
  ConsultaAlquiler.init({
    alquiler_id: DataTypes.INTEGER,
    FechaEntrega: DataTypes.DATE,
    Balance: DataTypes.DECIMAL,
    JuegosAlquilados: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ConsultaAlquiler',
  });
  return ConsultaAlquiler;
};