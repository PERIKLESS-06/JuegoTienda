const clienteController = require('../controller/cliente');
const juegoController = require('../controller/juego');
const alquilerController = require('../controller/alquiler');
const consultaAlquilerController = require('../controller/consultaalquiler');

module.exports = (app) => {

  // Rutas Cliente 
  app.post('/api/cliente/create', clienteController.create);
  app.get('/api/cliente/list', clienteController.list);
  app.get('/api/cliente/find/:identifier', clienteController.find);
  app.put('/api/cliente/update/:identifier', clienteController.updateCliente);
  app.delete('/api/cliente/delete/:identifier', clienteController.destroy);

  //Rutas juegos
  app.post('/api/juego/create', juegoController.create);
  app.get('/api/juego/list', juegoController.list);
  app.get('/api/juego/find/:identifier', juegoController.find);
  app.put('/api/juego/update/:identifier', juegoController.updateJuego);
  app.delete('/api/juego/delete/:identifier', juegoController.destroy);

  // Rutas Alquiler
  app.post('/api/alquiler/create', alquilerController.create);
  app.get('/api/alquiler/list', alquilerController.list);
  app.get('/api/alquiler/find/:id', alquilerController.findById);
  app.put('/api/alquiler/update/:id', alquilerController.updateAlquiler);
  app.delete('/api/alquiler/delete/:id', alquilerController.destroy);
  //rutas para Cumplir los requerimientos
  app.get('/api/alquiler/most-frequent-customer', alquilerController.getMostFrequentCustomer);
  app.get('/api/alquiler/most-rented-game', alquilerController.getMostRentedGame);
  app.post('/api/alquiler/rent-game', alquilerController.rentGame);
  app.get('/api/alquiler/daily-sales', alquilerController.getDailySales);



  //consultaAlquiler
  app.post('/api/consultaAlquiler/create', consultaAlquilerController.create);
  app.get('/api/consultaAlquiler/list', consultaAlquilerController.list);
  app.get('/api/consultaAlquiler/find/:id', consultaAlquilerController.findById);
  app.put('/api/consultaAlquiler/update/:id', consultaAlquilerController.updateConsultaAlquiler);
  app.delete('/api/consultaAlquiler/delete/:id', consultaAlquilerController.destroy);
};




