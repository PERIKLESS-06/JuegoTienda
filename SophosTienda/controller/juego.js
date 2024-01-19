const Sequelize = require("sequelize");
const Juego = require("../models").Juego;

module.exports = {
  // Función para crear un nuevo juego
  create(req, res) {
    const {
      Nombre,
      Descripcion,
      Protagonista,
      Precio,
      Director,
      Productor,
      Plataforma,
      FechaLanzamiento,
      Imagen,
    } = req.body;

    return Juego.create({
      Nombre,
      Descripcion,
      Protagonista,
      Precio,
      Director,
      Productor,
      Plataforma,
      FechaLanzamiento,
      Imagen,
    })
      .then((juego) => res.status(201).send(juego))
      .catch((error) => res.status(400).send(error));
  },

  // Función para obtener la lista de todos los juegos
  list(_, res) {
    return Juego.findAll({})
      .then((juegos) => res.status(200).send(juegos))
      .catch((error) => res.status(400).send(error));
  },

  // Función para buscar un juego por su ID
  findByID(req, res) {
    const { id } = req.params;

    return Juego.findByPk(id)
      .then((juego) => {
        if (!juego) {
          return res.status(404).send({ message: "Juego no encontrado" });
        }
        return res.status(200).send(juego);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Función para buscar un juego por su nombre
  findByName(req, res) {
    const { nombre } = req.params;

    return Juego.findOne({
      where: { Nombre: nombre },
    })
      .then((juego) => {
        if (!juego) {
          return res.status(404).send({ message: "Juego no encontrado" });
        }
        return res.status(200).send(juego);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Función para actualizar un juego por su ID o nombre
  updateJuego(req, res) {
    const { identifier } = req.params;
    const {
      nombre,
      descripcion,
      protagonista,
      precio,
      director,
      productor,
      plataforma,
      fechaLanzamiento,
      imagen,
    } = req.body;

    // Verifica si el identificador parece ser un número (ID) o una cadena (nombre)
    const isNumeric = /^\d+$/.test(identifier);
    const whereClause = isNumeric ? { id: identifier } : { Nombre: identifier };

    if (nombre) {
      Juego.findOne({ where: { Nombre: nombre } })
        .then((existingJuego) => {
          if (existingJuego && existingJuego.id !== Number(identifier)) {
            return res
              .status(400)
              .send({ message: "Ya existe un juego con el nuevo nombre" });
          } else {
            Juego.update(
              {
                Nombre: nombre,
                Descripcion: descripcion,
                Protagonista: protagonista,
                Precio: precio,
                Director: director,
                Productor: productor,
                Plataforma: plataforma,
                FechaLanzamiento: fechaLanzamiento,
                Imagen: imagen,
              },
              {
                where: whereClause,
              }
            )
              .then(([rowsUpdated]) => {
                if (rowsUpdated === 0) {
                  return res
                    .status(404)
                    .send({ message: "Juego no encontrado" });
                }
                return res
                  .status(200)
                  .send({ message: "Juego actualizado correctamente" });
              })
              .catch((error) => res.status(400).send(error));
          }
        })
        .catch((error) => res.status(400).send(error));
    } else {
      Juego.update(
        {
          Nombre: nombre,
          Descripcion: descripcion,
          Protagonista: protagonista,
          Precio: precio,
          Director: director,
          Productor: productor,
          Plataforma: plataforma,
          FechaLanzamiento: fechaLanzamiento,
          Imagen: imagen,
        },
        {
          where: whereClause,
        }
      )
        .then(([rowsUpdated]) => {
          if (rowsUpdated === 0) {
            return res.status(404).send({ message: "Juego no encontrado" });
          }
          return res
            .status(200)
            .send({ message: "Juego actualizado correctamente" });
        })
        .catch((error) => res.status(400).send(error));
    }
  },

  // Función para eliminar un juego por su ID o nombre
  destroy(req, res) {
    const { identifier } = req.params;
    const isNumeric = /^\d+$/.test(identifier);
    const whereClause = isNumeric ? { id: identifier } : { Nombre: identifier };

    return Juego.destroy({
      where: whereClause,
    })
      .then((rowsDeleted) => {
        if (rowsDeleted === 0) {
          return res.status(404).send({ message: "Juego no encontrado" });
        }
        return res.status(200).send({ message: "Juego borrado correctamente" });
      })
      .catch((error) => res.status(400).send(error));
  },
};
