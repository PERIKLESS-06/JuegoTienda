const clienteController = require('../controller/cliente');
const juegoController = require('../controller/juego');
const alquilerController = require('../controller/alquiler');


module.exports = (app) => {

  // Rutas Cliente 
  app.post('/api/cliente/create', clienteController.create);
  app.get('/api/cliente/list', clienteController.list);
  app.get('/api/cliente/findById/:id', clienteController.findById);
  app.get('/api/cliente/findByNumeroDocumento/:NumeroDocumento', clienteController.findByNumeroDocumento);
  app.put('/api/cliente/update/:identifier', clienteController.updateCliente);
  app.delete('/api/cliente/delete/:identifier', clienteController.destroy);

  //Rutas juegos
  app.post('/api/juego/create', juegoController.create);
  app.get('/api/juego/list', juegoController.list);
  app.get('/api/juego/findById/:id', juegoController.findByID);
  app.get('/api/juego/findByName/:nombre', juegoController.findByName);
  app.put('/api/juego/update/:identifier', juegoController.updateJuego);
  app.delete('/api/juego/delete/:identifier', juegoController.destroy);

  // Rutas Alquiler
  app.post('/api/alquiler/create', alquilerController.create);
  app.get('/api/alquiler/list', alquilerController.list);
  app.get('/api/alquiler/find/:id', alquilerController.findById);
  app.put('/api/alquiler/update/:id', alquilerController.updateAlquiler);
  app.delete('/api/alquiler/delete/:id', alquilerController.destroy);
  app.get('/api/alquiler/cliente/:cliente_id', alquilerController.getAlquileresPorClienteId);
  app.get('/api/alquiler/most-frequent-customer', alquilerController.getMostFrequentCustomer);
  app.get('/api/alquiler/most-rented-game', alquilerController.getMostRentedGame);
  app.get('/api/alquiler/least-rented-game-by-age', alquilerController.getLeastRentedGameByAge);

};




