const Sequelize = require('sequelize');
const { Alquiler, Cliente, Juego } = require('../models');

module.exports = {
  // Crear un nuevo alquiler
  create(req, res) {
    const { cliente_id, juego_id, FechaAlquiler, FechaEntrega, Precio } = req.body;

    return Alquiler
      .create({
        cliente_id,
        juego_id,
        FechaAlquiler,
        FechaEntrega,
        Precio
      })
      .then(alquiler => res.status(201).send(alquiler))
      .catch(error => res.status(400).send(error));
  },

  getMostFrequentCustomer(_, res) {
    return Alquiler
      .findAll({
        attributes: ['cliente_id', [Sequelize.fn('COUNT', 'cliente_id'), 'count']],
        group: ['cliente_id'],
        order: [[Sequelize.literal('count'), 'DESC']],
        limit: 1,
        include: [Cliente]
      })
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },

  getMostRentedGame(_, res) {
    return Alquiler
      .findAll({
        attributes: ['juego_id', [Sequelize.fn('COUNT', 'juego_id'), 'count']],
        group: ['juego_id'],
        order: [[Sequelize.literal('count'), 'DESC']],
        limit: 1,
        include: [Juego]
      })
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },

  rentGame(req, res) {
    const { cliente_id, juego_id, FechaAlquiler, FechaEntrega, Precio } = req.body;

    return Alquiler
      .create({
        cliente_id,
        juego_id,
        FechaAlquiler,
        FechaEntrega,
        Precio
      })
      .then(alquiler => {
        // Aquí puedes implementar la lógica para generar la prueba de compra
        // Puedes devolver la prueba de compra en la respuesta
        res.status(201).send(alquiler);
      })
      .catch(error => res.status(400).send(error));
  },

  getDailySales(_, res) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    return Alquiler
      .findAll({
        where: {
          FechaAlquiler: {
            [Sequelize.Op.between]: [startOfDay, endOfDay]
          }
        },
        include: [Juego]
      })
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },

  // Obtener la lista de todos los alquileres
  list(_, res) {
    return Alquiler
      .findAll({
        include: [Cliente, Juego]
      })
      .then(alquileres => res.status(200).send(alquileres))
      .catch(error => res.status(400).send(error));
  },

  // Buscar alquiler por ID
  findById(req, res) {
    const { id } = req.params;

    return Alquiler
      .findByPk(id, {
        include: [Cliente, Juego]
      })
      .then(alquiler => {
        if (!alquiler) {
          return res.status(404).send({ message: 'Alquiler no encontrado' });
        }
        return res.status(200).send(alquiler);
      })
      .catch(error => res.status(400).send(error));
  },

  // Actualizar un alquiler por ID
  updateAlquiler(req, res) {
    const { id } = req.params;
    const { new_cliente_id, new_juego_id, new_FechaAlquiler, new_FechaEntrega, new_Precio } = req.body;

    return Alquiler
      .findByPk(id)
      .then(alquiler => {
        if (!alquiler) {
          return res.status(404).send({ message: 'Alquiler no encontrado' });
        }

        return alquiler
          .update({
            cliente_id: new_cliente_id || alquiler.cliente_id,
            juego_id: new_juego_id || alquiler.juego_id,
            FechaAlquiler: new_FechaAlquiler || alquiler.FechaAlquiler,
            FechaEntrega: new_FechaEntrega || alquiler.FechaEntrega,
            Precio: new_Precio || alquiler.Precio,
          })
          .then(updatedAlquiler => res.status(200).send(updatedAlquiler))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  // Eliminar un alquiler por ID
  destroy(req, res) {
    const { id } = req.params;

    return Alquiler
      .findByPk(id)
      .then(alquiler => {
        if (!alquiler) {
          return res.status(404).send({ message: 'Alquiler no encontrado' });
        }

        return alquiler
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
