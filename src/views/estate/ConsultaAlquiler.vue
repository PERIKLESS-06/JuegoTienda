<template>
  <div class="costManagement">
    <div class="container">
      <fieldset>
        <!-- Input formulario -->
        <div class="form-group row">
          <!-- Menú desplegable -->
          <div class="form-group">
            <label for="optionSelect">Seleccione una opción:</label>
            <select v-model="selectedOption" @change="onOptionChange">
              <option value="arrendatario">Arrendatario</option>
              <option value="cliente">Cliente</option>
            </select>
          </div>

          <!-- Contenedor principal -->
          <div class="col-xs-12" v-if="selectedOption === 'cliente' || selectedOption === 'arrendatario'">
            <br />
            <h3>{{ selectedOption === 'cliente' ? 'Clientes' : 'Alquileres' }}</h3>

            <!-- Contenido de la tabla Cliente -->
            <div v-if="selectedOption === 'cliente'">
              <label for="numeroDocumento">Número de Documento:</label>
              <input v-model="numeroDocumento" type="text" id="numeroDocumento" />
              <button @click="loadJuegosAlquiladosPorCliente">Consultar</button>

              <!-- Mostrar información de juegos alquilados -->
              <table v-show="clienteTableVisible" class="table table-hover">
                <thead>
                  <tr class="table-primary">
                    <th>Juegos Alquilados</th>
                    <th>Fecha de Entrega</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Aquí llega la data de la API para Cliente -->
                  <tr v-for="juegoAlquilado in juegosAlquilados" :key="juegoAlquilado.id">
                    <td>{{ juegoAlquilado.Juego?.Nombre }}</td>
                    <td>{{ formatDate(juegoAlquilado.FechaEntrega) }}</td>
                    <td>{{ juegoAlquilado.Precio }}</td>
                  </tr>
                  <tr v-if="juegosAlquilados.length > 0">
  <td></td>
  <td><strong>Balance Total:</strong></td>
  <td><strong>{{ calcularBalanceTotal() }}</strong></td>
</tr>
                </tbody>
              </table>
            </div>

            <!-- Sección para tablas adicionales cuando se selecciona "arrendatario" -->
            <div v-else>
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
                  <tbody>
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
                  <tbody>
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
                      <td>{{ formatDate(venta.FechaAlquiler) }}</td>
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
                      <th>Rango de Edad del Cliente</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Aquí llega la data de la API -->
                    <tr v-for="juego in juegosMenosRentadosPorEdad" :key="juego.juego_id">
                      <td>{{ juego.Juego?.Nombre }}</td>
                      <td>{{ juego.Juego?.Descripcion }}</td>
                      <td>{{ juego.Juego?.Precio }}</td>
                      <td>{{ juego.Juego?.Plataforma }}</td>
                      <td>
                        <template v-if="juego.Cliente?.Edad !== undefined && juego.Cliente?.Edad !== null">
                          {{ parseInt(juego.Cliente?.Edad) }} - {{ parseInt(juego.Cliente?.Edad) + 9 }}
                        </template>
                        <template v-else>
                          Edad no disponible
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
      selectedOption: 'arrendatario',
      numeroDocumento: '',
      clienteTableVisible: false,
      listData: [],
      juegosMasFrecuentes: [],
      ventasDelDia: [],
      juegosMenosRentadosPorEdad: [],
      totalVentas: 0,
      ventasCliente: [],
      errorCedula: null,
      clienteIdSeleccionado: null,
      juegosAlquilados: [], // Agregado para almacenar juegos alquilados por cliente
    };
  },
  created() {
    this.loadClienteMasFrecuente();
    this.loadJuegosMasFrecuentes();
    this.loadVentasDelDia();
    this.loadJuegosMenosRentadosPorEdad();
  },
  methods: {
    onOptionChange() {
      // Lógica adicional si es necesario al cambiar la opción
    },
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
    isVentaDelDia(fechaAlquiler) {
      const fechaActual = new Date();
      const fechaAlquilerDate = new Date(fechaAlquiler);

      // Establecer ambas fechas a las 00:00:00 para ignorar la hora del día
      fechaActual.setUTCHours(0, 0, 0, 0);
      fechaAlquilerDate.setUTCHours(0, 0, 0, 0);

      return (
        fechaAlquilerDate.getTime() === fechaActual.getTime()
      );
    },
    formatDate(fecha) {
      // Convierte la fecha al formato deseado "YYYY-MM-DD"
      const date = new Date(fecha);
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = date.getUTCDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    loadVentasDelDia() {
      const fechaConsulta = this.$route.query.fecha || new Date().toISOString().split('T')[0];
      axios.get(`http://localhost:3000/api/alquiler/list?fecha=${fechaConsulta}`)
        .then(result => {
          // Filtrar las ventas del día
          const ventasDelDia = result.data.filter(venta => this.isVentaDelDia(venta.FechaAlquiler));
          this.ventasDelDia = ventasDelDia;
          this.totalVentas = ventasDelDia.length;
        })
        .catch(error => {
          console.error('Error al cargar datos de las ventas del día:', error);
        });
    },
    loadJuegosMenosRentadosPorEdad: function () {
      axios.get('http://localhost:3000/api/alquiler/least-rented-game-by-age')
        .then(result => {
          console.log(result.data); // Imprime los datos en la consola
          this.juegosMenosRentadosPorEdad = result.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de juegos menos rentados por edad:', error);
        });
    },
    loadJuegosAlquiladosPorCliente() {
      this.errorCedula = null;
      this.clienteIdSeleccionado = null;

      if (this.numeroDocumento) {
        const encodedNumeroDocumento = encodeURIComponent(this.numeroDocumento);

        // Primero, buscas el cliente por número de documento
        axios
          .get(`http://localhost:3000/api/cliente/findByNumeroDocumento/${encodedNumeroDocumento}`)
          .then((result) => {
            const clienteEncontrado = result.data;

            if (clienteEncontrado) {
              // Si el cliente existe, obtienes su ID
              this.clienteIdSeleccionado = clienteEncontrado.id;
              this.clienteTableVisible = true;

              // Luego, con el ID del cliente, buscas los juegos alquilados
              axios
                .get(`http://localhost:3000/api/alquiler/cliente/${this.clienteIdSeleccionado}`)
                .then(result => {
                  this.juegosAlquilados = result.data;
                })
                .catch(error => {
                  console.error('Error al cargar datos de juegos alquilados por el cliente:', error);
                });
            } else {
              // Manejas el caso en que el cliente no fue encontrado
              this.errorCedula = 'Cliente no encontrado';
            }
          })
          .catch((error) => {
            console.error('Error al cargar datos del cliente:', error);
          });
      } else {
        this.juegosAlquilados = [];
        this.clienteTableVisible = false;
        this.errorCedula = null;
      }
    },
    // ... (otros métodos) ...
    formatoDate(fecha) {
      // Convierte la fecha al formato deseado "DD/MM"
      const date = new Date(fecha);
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}`;
    },
    calcularBalanceTotal() {
      // Calcula la suma de los precios de los juegos alquilados
      return this.juegosAlquilados.reduce((total, juego) => total + parseFloat(juego.Precio), 0).toFixed(2);
    },
  },
};
</script>

<style>
.costManagement {
  margin-top: 20px;
}

/* Ajusta el tamaño de las tablas y agrega un borde */
table {
  width: 100%;
  margin-bottom: 20px;
  border: 3px solid #dee2e6;
}

/* Ajusta la altura máxima y agrega una barra de desplazamiento vertical */
table.table tbody {
  max-height: 150px;
  /* Ajusta la altura máxima según sea necesario */
  overflow-y: auto;
}

/* Centra los títulos de las tablas */
h3 {
  text-align: center;
}

/* Aplica el estilo Bootswatch Lux a las tablas */
table.table {
  background-color: #f8f9fa;
}

/* Ajusta el estilo de las celdas de encabezado */
table.table thead tr th {
  background-color: #343a40;
  color: #ffffff;
}

/* Ajusta el estilo de las celdas de datos */
table.table tbody tr td {
  background-color: #ffffff;
}
</style>
