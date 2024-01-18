const Sequelize = require('sequelize');
const Juego = require('../models').Juego;

module.exports = {
  // Crear un nuevo juego
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
      Imagen
    } = req.body;

    return Juego
      .create({
        Nombre,
        Descripcion,
        Protagonista,
        Precio,
        Director,
        Productor,
        Plataforma,
        FechaLanzamiento,
        Imagen
      })
      .then(juego => res.status(201).send(juego))
      .catch(error => res.status(400).send(error));
  },

  // Obtener la lista de juegos
  list(_, res) {
    return Juego
      .findAll({})
      .then(juegos => res.status(200).send(juegos))
      .catch(error => res.status(400).send(error));
  },
// Buscar un juego por ID
// Buscar un juego por ID
findByID(req, res) {
  const { id } = req.params;

  return Juego
    .findByPk(id)
    .then(juego => {
      if (!juego) {
        return res.status(404).send({ message: 'Juego no encontrado' });
      }
      return res.status(200).send(juego);
    })
    .catch(error => res.status(400).send(error));
},

// Buscar un juego por nombre
findByName(req, res) {
  const { nombre } = req.params;

  return Juego
    .findOne({
      where: { Nombre: nombre },
    })
    .then(juego => {
      if (!juego) {
        return res.status(404).send({ message: 'Juego no encontrado' });
      }
      return res.status(200).send(juego);
    })
    .catch(error => res.status(400).send(error));
},



  // Actualizar un juego
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
      imagen
    } = req.body;

    const isNumeric = /^\d+$/.test(identifier);
    const whereClause = isNumeric ? { id: identifier } : { Nombre: identifier };

    if (nombre) {
      Juego.findOne({ where: { Nombre: nombre } })
        .then(existingJuego => {
          if (existingJuego && existingJuego.id !== Number(identifier)) {
            return res.status(400).send({ message: 'Ya existe un juego con el nuevo nombre' });
          } else {
            Juego.update({
              Nombre: nombre,
              Descripcion: descripcion,
              Protagonista: protagonista,
              Precio: precio,
              Director: director,
              Productor: productor,
              Plataforma: plataforma,
              FechaLanzamiento: fechaLanzamiento,
              Imagen: imagen
            }, {
              where: whereClause,
            })
              .then(([rowsUpdated]) => {
                if (rowsUpdated === 0) {
                  return res.status(404).send({ message: 'Juego no encontrado' });
                }
                return res.status(200).send({ message: 'Juego actualizado correctamente' });
              })
              .catch(error => res.status(400).send(error));
          }
        })
        .catch(error => res.status(400).send(error));
    } else {
      Juego.update({
        Nombre: nombre,
        Descripcion: descripcion,
        Protagonista: protagonista,
        Precio: precio,
        Director: director,
        Productor: productor,
        Plataforma: plataforma,
        FechaLanzamiento: fechaLanzamiento,
        Imagen: imagen
      }, {
        where: whereClause,
      })
        .then(([rowsUpdated]) => {
          if (rowsUpdated === 0) {
            return res.status(404).send({ message: 'Juego no encontrado' });
          }
          return res.status(200).send({ message: 'Juego actualizado correctamente' });
        })
        .catch(error => res.status(400).send(error));
    }
  },

  // Eliminar un juego
  destroy(req, res) {
    const { identifier } = req.params;
    const isNumeric = /^\d+$/.test(identifier);
    const whereClause = isNumeric ? { id: identifier } : { Nombre: identifier };

    return Juego
      .destroy({
        where: whereClause,
      })
      .then(rowsDeleted => {
        if (rowsDeleted === 0) {
          return res.status(404).send({ message: 'Juego no encontrado' });
        }
        return res.status(200).send({ message: 'Juego borrado correctamente' });
      })
      .catch(error => res.status(400).send(error));
  },
};
