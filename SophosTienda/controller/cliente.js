const Sequelize = require("sequelize");
const Cliente = require("../models").Cliente;

module.exports = {
  // Función para crear un nuevo cliente
  create(req, res) {
    const {
      TipoDocumento,
      NumeroDocumento,
      Nombres,
      Apellidos,
      Email,
      Telefono,
      Edad,
    } = req.body;

    return Cliente.create({
      TipoDocumento,
      NumeroDocumento,
      Nombres,
      Apellidos,
      Email,
      Telefono,
      Edad,
    })
      .then((cliente) => res.status(201).send(cliente))
      .catch((error) => res.status(400).send(error));
  },

  // Función para obtener la lista de todos los clientes
  list(_, res) {
    return Cliente.findAll({})
      .then((clientes) => res.status(200).send(clientes))
      .catch((error) => res.status(400).send(error));
  },

  // Función para buscar un cliente por su ID
  findById(req, res) {
    const { id } = req.params;

    return Cliente.findByPk(id)
      .then((cliente) => {
        if (!cliente) {
          return res.status(404).send({ message: "Cliente no encontrado" });
        }
        return res.status(200).send(cliente);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Función para buscar un cliente por su NumeroDocumento
  findByNumeroDocumento(req, res) {
    const { NumeroDocumento } = req.params;

    return Cliente.findOne({
      where: { NumeroDocumento: NumeroDocumento },
    })
      .then((cliente) => {
        if (!cliente) {
          return res.status(404).send({ message: "Cliente no encontrado" });
        }
        return res.status(200).send(cliente);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Función para actualizar un cliente por su ID o nombre
  updateCliente(req, res) {
    const { identifier } = req.params;
    const {
      nombres,
      tipoDocumento,
      numeroDocumento,
      apellidos,
      email,
      telefono,
      edad,
    } = req.body;

    // Verifica si el identificador parece ser un número (ID) o una cadena (nombre)
    const isNumeric = /^\d+$/.test(identifier);
    const whereClause = isNumeric
      ? { id: identifier }
      : { Nombres: identifier };

    return Cliente.update(
      {
        Nombres: nombres,
        TipoDocumento: tipoDocumento,
        NumeroDocumento: numeroDocumento,
        Apellidos: apellidos,
        Email: email,
        Telefono: telefono,
        Edad: edad,
      },
      {
        where: whereClause,
      }
    )
      .then(([rowsUpdated]) => {
        if (rowsUpdated === 0) {
          return res.status(404).send({ message: "Cliente no encontrado" });
        }
        return res
          .status(200)
          .send({ message: "Cliente actualizado correctamente" });
      })
      .catch((error) => res.status(400).send(error));
  },

  // Función para eliminar un cliente por su ID o nombre
  destroy(req, res) {
    const { identifier } = req.params;

    // Verifica si el identificador parece ser un número (ID) o una cadena (nombre)
    const isNumeric = /^\d+$/.test(identifier);
    const whereClause = isNumeric
      ? { id: identifier }
      : { Nombres: identifier };

    return Cliente.destroy({
      where: whereClause,
    })
      .then((rowsDeleted) => {
        if (rowsDeleted === 0) {
          return res.status(404).send({ message: "Cliente no encontrado" });
        }
        return res
          .status(200)
          .send({ message: "Cliente borrado correctamente" });
      })
      .catch((error) => res.status(400).send(error));
  },
};
