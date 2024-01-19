<template>
    <div class="cost-management">
        <form data-bitwarden-watching="1" class="text-center mt-5">
            <fieldset class="col-md-4 offset-md-4 border border-dark p-4"
                style="background-color: #f0f0f0; color: black; border-radius: 10px;">
                <legend class="form-title">ALQUILAR</legend>
                <!--Guardar el id invisible-->
                <input type="hidden" :value="juegoSeleccionado ? juegoSeleccionado.id : ''" />
                <input type="hidden" :value="datosClientes ? datosClientes.id : ''" />

                <div class="form-group">
                    <label for="NumeroDocumento" class="form-label mt-4">Número de Documento del Cliente</label>
                    <input type="text" class="form-control" v-model="NumeroDocumento" style="text-align: center;"
                        @change="loadCedula" />
                    <span v-if="errorCedula" style="color: red;">{{ errorCedula }}</span>
                </div>

                <div class="form-group">
                    <label class="form-label mt-4">Nombre del juego</label>
                    <input type="text" class="form-control-plaintext" readonly
                        :value="juegoSeleccionado ? juegoSeleccionado.Nombre : ''" style="text-align: center;" />
                </div>
                <div class="form-group">
                    <label class="form-label mt-4">Fecha de alquiler</label>
                    <input type="text" class="form-control-plaintext" readonly :value="fecha" style="text-align: center;" />
                </div>
                <div class="form-group">
                    <label class="form-label mt-4">Precio total</label>
                    <input type="text" class="form-control-plaintext" readonly :value="precioTotal.toFixed()"
                        style="text-align: center;" />
                </div>
                <div class="form-group">
                    <label for="fechaEntrega" class="form-label mt-4">Fecha de entrega</label>
                    <input type="date" class="form-control sizeText mb-3" v-model="fechaEntrega"
                        @change="calcularPrecioTotal" />
                </div>

                <!-- botones de gestión para Agregar o Modificar -->
                <div class="row justify-content-center mt-4">
                    <div class="col-md-4 mb-2">
                        <button type="button" class="btn btn-primary btn-block rounded-pill" @click="addAlquiler">
                            ALQUILAR
                        </button>
                    </div>
                    <div class="col-md-4 mb-2">
                        <button type="button" class="btn btn-danger btn-block rounded-pill" @click="cancelarAlquiler">
                            Cancelar
                        </button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'AlquileresS',
    data() {
        return {
            id: 0,
            id_juego: 0,
            nombre: '',
            NumeroDocumento: '',
            fechaEntrega: null,
            juegoSeleccionado: null,
            precioTotal: 0,
            fecha: this.$route.query.fecha,
            datosClientes: null,
            errorCedula: null,
            clienteIdSeleccionado: null,
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        // Función para cargar datos del juego seleccionado
        loadData() {
            const nombreJuego = this.$route.query.nombre.trim();
            axios
                .get(`http://localhost:3000/api/juego/findByName/${nombreJuego}`)
                .then((result) => {
                    this.juegoSeleccionado = result.data;
                })
                .catch((error) => {
                    console.error('Error al cargar datos del juego:', error);
                });
        },
        // Función para calcular el precio total del alquiler
        calcularPrecioTotal() {
            if (this.juegoSeleccionado && this.fechaEntrega) {
                const precioBase = parseFloat(this.juegoSeleccionado.Precio) || 0;
                const arriendoInicial = 1; // Asumo que es 1 dólar por día
                const duracionAlquiler = Math.ceil(
                    (new Date(this.fechaEntrega) - new Date(this.fecha)) / (1000 * 60 * 60 * 24)
                );
                this.precioTotal = precioBase + arriendoInicial * duracionAlquiler;
            } else {
                this.precioTotal = 0;
            }
        },
        // Función para cargar datos del cliente por su número de documento
        loadCedula() {
            this.errorCedula = null;
            this.clienteIdSeleccionado = null;

            if (this.NumeroDocumento) {
                const encodedNumeroDocumento = encodeURIComponent(this.NumeroDocumento);

                axios
                    .get(`http://localhost:3000/api/cliente/findByNumeroDocumento/${encodedNumeroDocumento}`)
                    .then((result) => {
                        this.datosClientes = result.data;
                        this.clienteIdSeleccionado = this.datosClientes ? this.datosClientes.id : null;
                        this.calcularPrecioTotal();
                    })
                    .catch((error) => {
                        console.error('Error al cargar datos del cliente:', error);
                        this.datosClientes = null;
                        this.clienteIdSeleccionado = null;

                        if (error.response && error.response.status === 404) {
                            this.errorCedula = 'Cliente no encontrado';
                        } else {
                            console.error('Error desconocido al cargar datos del cliente:', error);
                        }
                    });
            } else {
                this.datosClientes = null;
            }
        },
        // Función para agregar un nuevo alquiler
        addAlquiler() {
            if (this.clienteIdSeleccionado && this.fechaEntrega && !this.errorCedula) {
                Swal.fire({
                    title: '¿Desea guardar el registro?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                    denyButtonText: 'No guardar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Registro almacenado con éxito!', '', 'success');
                        let datos = {
                            cliente_id: this.clienteIdSeleccionado,
                            juego_id: this.juegoSeleccionado ? this.juegoSeleccionado.id : null,
                            FechaAlquiler: this.fecha,
                            FechaEntrega: this.fechaEntrega,
                            Precio: this.precioTotal,
                        };
                        axios
                            .post('http://localhost:3000/api/alquiler/create', datos)
                            .then((response) => {
                                console.log('Respuesta del servidor:', response.data);
                                // Puedes realizar acciones adicionales si es necesario
                            })
                            .catch((error) => {
                                console.error('Error al guardar el registro:', error);
                                Swal.fire('Error al guardar el registro', '', 'error');
                            });
                    } else if (result.isDenied) {
                        Swal.fire('Sin guardar cambios', '', 'info');
                    }
                });
            } else {
                Swal.fire('Complete la información del cliente y la fecha de entrega', '', 'warning');
            }
        },
        // Función para cancelar el proceso de alquiler
        cancelarAlquiler() {
            this.$router.push({ name: 'home' });
        },
    },
};
</script>
  
<style scoped>
.form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.form-title {
    text-transform: uppercase;
    color: #333;
    font-size: 30px;
}
</style>
