<template>
    <div class="cost-management">
        <form data-bitwarden-watching="1" class="text-center mt-5">
            <fieldset class="col-md-4 offset-md-4 border border-dark p-4"
                style="background-color: #f0f0f0; color: black; border-radius: 10px;">
                <legend class="form-title">ALQUILAR</legend>
                <div class="form-group">
                    <label for="nombre" class="form-label mt-4">Nombre del Cliente</label>
                    <input type="text" class="form-control" v-model="nombre" placeholder="Nombre del Cliente" id="nombre"
                        style="text-align: center;">
                </div>
                <div class="form-group">
                    <label class="form-label mt-4">Nombre del juego</label>
                    <input type="text" class="form-control-plaintext" readonly :value="juegoSeleccionado ? juegoSeleccionado.Nombre : ''"
                        style="text-align: center;">
                </div>
                <div class="form-group">
                    <label class="form-label mt-4">Fecha de alquiler</label>
                    <input type="text" class="form-control-plaintext" readonly :value="$route.query.fecha"
                        style="text-align: center;">
                </div>
                <div class="form-group">
                    <label class="form-label mt-4">Precio total</label>
                    <input type="text" class="form-control-plaintext" readonly :value="precioTotal.toFixed(2)"
                        style="text-align: center;">
                </div>
                <div class="form-group">
                    <label for="fechaEntrega" class="form-label mt-4">Fecha de entrega</label>
                    <input type="date" class="form-control sizeText mb-3" v-model="fechaEntrega" @change="calcularPrecioTotal">
                </div>
                <!-- botones de gestión para Agregar o Modificar -->
                <div class="row justify-content-center mt-4">
                    <div class="col-md-4 mb-2">
                        <button type="button" class="btn btn-primary btn-block rounded-pill"
                            @click="addAlquiler">ALQUILAR</button>
                    </div>
                    <div class="col-md-4 mb-2">
                        <button type="button" class="btn btn-danger btn-block rounded-pill"
                            @click="cancelarAlquiler">Cancelar</button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AlquileresS',
    data() {
        return {
            nombre: "",
            fechaEntrega: null,
            juegoSeleccionado: null,
            precioTotal: 0,
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            // Cargar datos del juego
            axios.get(`http://localhost:3000/api/juego/find/${this.$route.query.nombre}`)
                .then(result => {
                    this.juegoSeleccionado = result.data;
                })
                .catch(error => {
                    console.error('Error al cargar datos del juego:', error);
                });
        },
        calcularPrecioTotal() {
            if (this.juegoSeleccionado && this.fechaEntrega) {
                const precioBase = parseFloat(this.juegoSeleccionado.Precio) || 0;
                const arriendoInicial = 1; // Asumo que es 1 dolar por día
                const duracionAlquiler = Math.max(1, Math.ceil((new Date(this.fechaEntrega) - new Date(this.$route.query.fecha)) / (1000 * 60 * 60 * 24)));
                this.precioTotal = precioBase + arriendoInicial * duracionAlquiler;
            } else {
                this.precioTotal = 0;
            }
        },
        addAlquiler() {
    // Verifica que tengamos nombre, juegoSeleccionado y fechaEntrega
    if (this.nombre && this.juegoSeleccionado && this.fechaEntrega) {
        const confirmation = window.confirm('¿Estás seguro de agregar este alquiler?');

        if (confirmation) {
            // Buscar el cliente por el nombre
            axios.get(`http://localhost:3000/api/cliente/find?nombre=${this.nombre}`)
                .then(clienteResult => {
                    const cliente = clienteResult.data;

                    if (cliente) {
                        // Buscar el juego por el nombre
                        axios.get(`http://localhost:3000/api/juego/find?nombre=${this.juegoSeleccionado.Nombre}`)
                            .then(juegoResult => {
                                const juego = juegoResult.data;

                                if (juego) {
                                    // Si se encuentra el cliente y el juego, procede a agregar el alquiler
                                    const nuevoAlquiler = {
                                        cliente: {
                                            id: cliente.id,
                                            nombre: cliente.nombre,
                                            // Otros campos del cliente que desees incluir
                                        },
                                        juego: {
                                            id: juego.id,
                                            nombre: juego.nombre,
                                            // Otros campos del juego que desees incluir
                                        },
                                        FechaAlquiler: this.$route.query.fecha,
                                        FechaEntrega: this.fechaEntrega,
                                        Precio: this.precioTotal,
                                    };

                                    // Agrega el alquiler
                                    axios.post('http://localhost:3000/api/alquiler/create', nuevoAlquiler)
                                        .then(response => {
                                            console.log(response.data);
                                            this.loadData();
                                        })
                                        .catch(error => {
                                            console.error('Error al agregar alquiler:', error);
                                        });
                                } else {
                                    // Si no se encuentra el juego, muestra un mensaje o toma la acción adecuada
                                    console.error('Juego no encontrado');
                                }
                            })
                            .catch(error => {
                                console.error('Error al buscar juego:', error);
                            });
                    } else {
                        // Si no se encuentra el cliente, muestra un mensaje o toma la acción adecuada
                        console.error('Cliente no encontrado');
                    }
                })
                .catch(error => {
                    console.error('Error al buscar cliente:', error);
                });
        }
    } else {
        // Muestra un mensaje o toma la acción adecuada si falta información
        console.error('Falta información para agregar el alquiler');
    }
},
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
