const Sequelize = require('sequelize');
const Cliente = require('../models').Cliente;


module.exports = {
  create(req, res) {
    const { TipoDocumento, NumeroDocumento, Nombres, Apellidos, Email, Telefono, Edad } = req.body;

    return Cliente
      .create({
        TipoDocumento,
        NumeroDocumento,
        Nombres,
        Apellidos,
        Email,
        Telefono,
        Edad
      })
      .then(cliente => res.status(201).send(cliente))
      .catch(error => res.status(400).send(error));
  },

  // Obtener la lista de todos los clientes
  list(_, res) {
    return Cliente
      .findAll({})
      .then(clientes => res.status(200).send(clientes))
      .catch(error => res.status(400).send(error));
  },

   // Buscar cliente por nombre
  find(req, res) {
    const { identifier } = req.params;
    const isNumeric = /^\d+$/.test(identifier);
  
    const whereClause = isNumeric ? { id: identifier } : { Nombres: identifier };
  
    return Cliente
      .findOne({
        where: whereClause,
      })
      .then(cliente => {
        if (!cliente) {
          return res.status(404).send({ message: 'Cliente no encontrado' });
        }
        return res.status(200).send(cliente);
      })
      .catch(error => res.status(400).send(error));
  },
  


    // Actualizar un cliente por su nombre
    updateCliente(req, res) {
      const { identifier } = req.params;
      const { new_nombre, apellidos, email, telefono, edad } = req.body;
  
      // Verifica si el identificador parece ser un número (ID) o una cadena (nombre)
      const isNumeric = /^\d+$/.test(identifier);
      const whereClause = isNumeric ? { id: identifier } : { Nombres: identifier };
  
      return Cliente
        .update({
          Nombres: new_nombre,
          Apellidos: apellidos,
          Email: email,
          Telefono: telefono,
          Edad: edad,
        }, {
          where: whereClause,
        })
        .then(([rowsUpdated]) => {
          if (rowsUpdated === 0) {
            return res.status(404).send({ message: 'Cliente no encontrado' });
          }
          return res.status(200).send({ message: 'Cliente actualizado correctamente' });
        })
        .catch(error => res.status(400).send(error));
    },
    
  // Borrar un cliente por su nombre
  destroy(req, res) {
    const { identifier } = req.params;

    // Verifica si el identificador parece ser un número (ID) o una cadena (nombre)
    const isNumeric = /^\d+$/.test(identifier);
    const whereClause = isNumeric ? { id: identifier } : { Nombres: identifier };

    return Cliente
      .destroy({
        where: whereClause,
      })
      .then(rowsDeleted => {
        if (rowsDeleted === 0) {
          return res.status(404).send({ message: 'Cliente no encontrado' });
        }
        return res.status(200).send({ message: 'Cliente borrado correctamente' });
      })
      .catch(error => res.status(400).send(error));
  },

};