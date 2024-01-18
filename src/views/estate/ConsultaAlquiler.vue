<template>
    <div class="costManagement">
      <div class="container">
        <fieldset>
          <!-- Input formulario -->
          <div class="form-group row">
            <!-- Tabla para Cliente más frecuente -->
            <div class="col-xs-12">
              <br />
              <h3>Cliente más frecuente</h3>
              <table class="table table-hover">
                <thead>
                  <tr class="table-primary">
                    <th>Nombre y Apellido</th>
                    <th>Edad</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody id="dataResult">
                  <!-- Aquí llega la data de la API -->
                  <tr v-for="item in listData" :key="item.cliente_id">
                    <td>{{ `${item.Cliente?.Nombres || ''} ${item.Cliente?.Apellidos || ''}` }}</td>
                    <td>{{ item.Cliente?.Edad }}</td>
                    <td>{{ item.count }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <!-- Tabla para Juegos más frecuentes -->
            <div class="col-xs-12">
              <br />
              <h3>Juegos más frecuentes</h3>
              <table class="table table-hover">
                <thead>
                  <tr class="table-primary">
                    <th>Nombre del Juego</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Plataforma</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody id="dataResult">
                  <!-- Aquí llega la data de la API -->
                  <tr v-for="juego in juegosMasFrecuentes" :key="juego.juego_id">
                    <td>{{ juego.Juego?.Nombre }}</td>
                    <td>{{ juego.Juego?.Descripcion }}</td>
                    <td>{{ juego.Juego?.Precio }}</td>
                    <td>{{ juego.Juego?.Plataforma }}</td>
                    <td>{{ juego.count }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <!-- Tabla para Ventas del Día -->
            <div class="col-xs-12">
              <br />
              <h3>Ventas del Día = {{ this.totalVentas }}</h3>
              <table class="table table-hover">
                <thead>
                  <tr class="table-primary">
                    <th>Nombre del Juego</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Fecha de Alquiler</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Aquí llega la data de la API -->
                  <tr v-for="venta in ventasDelDia" :key="venta.id">
                    <td>{{ venta.Juego?.Nombre }}</td>
                    <td>{{ venta.Juego?.Descripcion }}</td>
                    <td>{{ venta.Precio }}</td>
                    <td>{{ venta.FechaAlquiler }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <!-- Tabla para Juegos menos rentados por edad -->
            <div class="col-xs-12">
              <br />
              <h3>Juegos menos rentados por edad</h3>
              <table class="table table-hover">
                <thead>
                  <tr class="table-primary">
                    <th>Nombre del Juego</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Plataforma</th>
                    <th>Edad del Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Aquí llega la data de la API -->
                  <tr v-for="juego in juegosMenosRentadosPorEdad" :key="juego.juego_id">
                    <td>{{ juego.Juego?.Nombre }}</td>
                    <td>{{ juego.Juego?.Descripcion }}</td>
                    <td>{{ juego.Juego?.Precio }}</td>
                    <td>{{ juego.Juego?.Plataforma }}</td>
                    <td>{{ juego.Cliente?.Edad }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ConsultaAlquiler',
    data() {
      return {
        listData: [],
        juegosMasFrecuentes: [],
        ventasDelDia: [],
        juegosMenosRentadosPorEdad: [],
        totalVentas: 0,
      };
    },
    created() {
      this.loadClienteMasFrecuente();
      this.loadJuegosMasFrecuentes();
      this.loadVentasDelDia();
      this.loadJuegosMenosRentadosPorEdad();
    },
    methods: {
      loadClienteMasFrecuente: function () {
        axios.get('http://localhost:3000/api/alquiler/most-frequent-customer')
          .then(result => {
            this.listData = result.data;
          })
          .catch(error => {
            console.error('Error al cargar datos del cliente más frecuente:', error);
          });
      },
      loadJuegosMasFrecuentes: function () {
        axios.get('http://localhost:3000/api/alquiler/most-rented-game')
          .then(result => {
            this.juegosMasFrecuentes = result.data;
          })
          .catch(error => {
            console.error('Error al cargar datos de juegos más frecuentes:', error);
          });
      },
      loadVentasDelDia: function () {
        const fechaConsulta = this.$route.query.fecha || new Date().toISOString().split('T')[0]; // Obtener la fecha del query o usar la fecha actual
        axios.get(`http://localhost:3000/api/alquiler/list?fecha=${fechaConsulta}`)
          .then(result => {
            this.ventasDelDia = result.data;
            this.totalVentas = this.ventasDelDia.length;
          })
          .catch(error => {
            console.error('Error al cargar datos de las ventas del día:', error);
          });
      },
      loadJuegosMenosRentadosPorEdad: function () {
        axios.get('http://localhost:3000/api/alquiler/least-rented-game-by-age')
          .then(result => {
            this.juegosMenosRentadosPorEdad = result.data;
          })
          .catch(error => {
            console.error('Error al cargar datos de juegos menos rentados por edad:', error);
          });
      },
    },
  };
  </script>
  