const Sequelize = require("sequelize");
const { Alquiler, Cliente, Juego } = require("../models");

module.exports = {
  // Función para crear un nuevo alquiler
  create(req, res) {
    const { cliente_id, juego_id, FechaAlquiler, FechaEntrega, Precio } =
      req.body;

    return Alquiler.create({
      cliente_id,
      juego_id,
      FechaAlquiler,
      FechaEntrega,
      Precio,
    })
      .then((alquiler) => res.status(201).send(alquiler))
      .catch((error) => res.status(400).send(error));
  },

  // Función para obtener a los clientes más frecuentes en alquileres
  getMostFrequentCustomer(_, res) {
    return Alquiler.findAll({
      attributes: [
        "cliente_id",
        [Sequelize.fn("COUNT", "cliente_id"), "count"],
      ],
      group: ["cliente_id"],
      order: [[Sequelize.literal("count"), "DESC"]],
      limit: 5,
      include: [Cliente],
    })
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },

  // Función para obtener los juegos más alquilados
  getMostRentedGame(_, res) {
    return Alquiler.findAll({
      attributes: ["juego_id", [Sequelize.fn("COUNT", "juego_id"), "count"]],
      group: ["juego_id"],
      order: [[Sequelize.literal("count"), "DESC"]],
      limit: 5,
      include: [Juego],
    })
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },

  // Función para obtener el juego menos alquilado según el rango de edad del cliente
  getLeastRentedGameByAge(_, res) {
    return Alquiler.findAll({
      attributes: [
        "juego_id",
        [Sequelize.fn("COUNT", "juego_id"), "count"],
        [Sequelize.literal("(Cliente.Edad / 10) * 10"), "edad_rango"], // Agrupa por rango de edad de 10 en 10 años
      ],
      include: [
        {
          model: Cliente,
          attributes: [], // No seleccionamos campos de Cliente directamente
        },
        Juego,
      ],
      group: ["juego_id", "edad_rango"],
      order: [[Sequelize.literal("count"), "ASC"]],
      limit: 1,
    })
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },

  // Función para obtener los alquileres de un cliente por su ID
  getAlquileresPorClienteId(req, res) {
    const { cliente_id } = req.params;

    Alquiler.findAll({
      where: { cliente_id },
      include: [
        {
          model: Cliente,
          attributes: ["Nombres", "Apellidos", "Edad"], // Ajusta los campos según tus necesidades
        },
        {
          model: Juego,
          attributes: ["Nombre", "Descripcion", "Precio", "Plataforma"], // Ajusta los campos según tus necesidades
        },
      ],
    })
      .then((alquileres) => {
        res.status(200).json(alquileres);
      })
      .catch((error) => {
        console.error("Error al obtener alquileres por cliente:", error);
        res.status(500).send("Error interno del servidor");
      });
  },

  // Función para obtener la lista de todos los alquileres
  list(_, res) {
    return Alquiler.findAll({
      include: [Cliente, Juego],
    })
      .then((alquileres) => res.status(200).send(alquileres))
      .catch((error) => res.status(400).send(error));
  },

  // Función para buscar un alquiler por su ID
  findById(req, res) {
    const { id } = req.params;

    return Alquiler.findByPk(id, {
      include: [Cliente, Juego],
    })
      .then((alquiler) => {
        if (!alquiler) {
          return res.status(404).send({ message: "Alquiler no encontrado" });
        }
        return res.status(200).send(alquiler);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Función para actualizar un alquiler por su ID
  updateAlquiler(req, res) {
    const { id } = req.params;
    const {
      new_cliente_id,
      new_juego_id,
      new_FechaAlquiler,
      new_FechaEntrega,
      new_Precio,
    } = req.body;

    return Alquiler.findByPk(id)
      .then((alquiler) => {
        if (!alquiler) {
          return res.status(404).send({ message: "Alquiler no encontrado" });
        }

        return alquiler
          .update({
            cliente_id: new_cliente_id || alquiler.cliente_id,
            juego_id: new_juego_id || alquiler.juego_id,
            FechaAlquiler: new_FechaAlquiler || alquiler.FechaAlquiler,
            FechaEntrega: new_FechaEntrega || alquiler.FechaEntrega,
            Precio: new_Precio || alquiler.Precio,
          })
          .then((updatedAlquiler) => res.status(200).send(updatedAlquiler))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  // Función para eliminar un alquiler por su ID
  destroy(req, res) {
    const { id } = req.params;

    return Alquiler.findByPk(id)
      .then((alquiler) => {
        if (!alquiler) {
          return res.status(404).send({ message: "Alquiler no encontrado" });
        }

        return alquiler
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
