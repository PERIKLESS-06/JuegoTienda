const Sequelize = require('sequelize');
const { ConsultaAlquiler } = require('../models');

module.exports = {
  // Crear una nueva consulta de alquiler
  create(req, res) {
    // Extraer datos del cuerpo de la solicitud
    const { alquiler_id, FechaEntrega, Balance, JuegosAlquilados } = req.body;

    // Crear una nueva instancia de ConsultaAlquiler en la base de datos
    return ConsultaAlquiler
      .create({
        alquiler_id,
        FechaEntrega,
        Balance,
        JuegosAlquilados
      })
      .then(consultaAlquiler => res.status(201).send(consultaAlquiler))
      .catch(error => res.status(400).send(error));
  },

  // Obtener la lista de todas las consultas de alquiler
  list(_, res) {
    // Obtener todas las consultas de alquiler con datos del alquiler asociado
    return ConsultaAlquiler
      .findAll({
        include: 'Alquiler' // Para incluir los datos del alquiler asociado
      })
      .then(consultaAlquileres => res.status(200).send(consultaAlquileres))
      .catch(error => res.status(400).send(error));
  },

  // Buscar una consulta de alquiler por ID
  findById(req, res) {
    // Extraer el ID de los parámetros de la solicitud
    const { id } = req.params;

    // Buscar una consulta de alquiler por ID con datos del alquiler asociado
    return ConsultaAlquiler
      .findOne({
        where: {
          id: id,
        },
        include: 'Alquiler' // Para incluir los datos del alquiler asociado
      })
      .then(consultaAlquiler => {
        if (!consultaAlquiler) {
          return res.status(404).send({ message: 'Consulta de alquiler no encontrada' });
        }
        return res.status(200).send(consultaAlquiler);
      })
      .catch(error => res.status(400).send(error));
  },

  // Actualizar una consulta de alquiler por ID
  updateConsultaAlquiler(req, res) {
    // Extraer el ID de los parámetros de la solicitud
    const { id } = req.params;
    // Extraer los datos del cuerpo de la solicitud
    const { alquiler_id, FechaEntrega, Balance, JuegosAlquilados } = req.body;

    // Actualizar la consulta de alquiler por ID
    return ConsultaAlquiler
      .update({
        alquiler_id,
        FechaEntrega,
        Balance,
        JuegosAlquilados
      }, {
        where: {
          id: id,
        },
      })
      .then(consultaAlquiler => res.status(200).send(consultaAlquiler))
      .catch(error => res.status(400).send(error));
  },

  // Eliminar una consulta de alquiler por ID
  destroy(req, res) {
    // Extraer el ID de los parámetros de la solicitud
    const { id } = req.params;

    // Eliminar la consulta de alquiler por ID
    return ConsultaAlquiler
      .destroy({
        where: {
          id: id,
        },
      })
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error));
  },
};
