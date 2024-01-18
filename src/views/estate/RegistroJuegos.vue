<template>
    <div class="costManagement ">
        <div>
            <fieldset>
                <!-- Input formulario -->
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-md-6  ">

                            <legend>Guardar Juegos</legend>

                            <input type="hidden" v-model="id">
                            <input type="text" class="form-control sizeText mb-3" v-model="nombre" placeholder="Nombre">
                            <textarea class="form-control sizeText mb-3" v-model="descripcion"
                                placeholder="Descripción"></textarea>
                            <input type="text" class="form-control sizeText mb-3" v-model="protagonista"
                                placeholder="Ingresar El nombre del Protagonista">
                            <input type="number" class="form-control sizeText mb-3" v-model="precio"
                                placeholder="Ingresar El precio">
                            <input type="text" class="form-control sizeText mb-3" v-model="director"
                                placeholder="Ingresar El nombre del director">
                            <input type="text" class="form-control sizeText mb-3" v-model="productor"
                                placeholder="Ingresar El nombre del Productor">
                            <select class="form-select sizeText mb-3" v-model="plataforma">
                                <option value="" disabled selected hidden>Selecciona la plataforma</option>
                                <option value="PlayStation">PlayStation</option>
                                <option value="Xbox">Xbox</option>
                                <option value="Nintendo">Nintendo</option>
                                <option value="PC">Pc</option>
                            </select>

                            <!-- Usa un campo de entrada de fecha nativo -->
                            <input type="date" class="form-control sizeText mb-3" v-model="fechaLanzamiento" />
                            <input type="text" class="form-control sizeText mb-3" v-model="imagen"
                                placeholder="Ingresar el url de la imagen">
                            <!-- botones de gestión para Agregar o Modificar -->

                            <div class="row justify-content-center">
                                <div class="col-md-2 mb-2 ">
                                    <button type="button" class="btn btn-primary btn-block"
                                        @click="addData();">Agregar</button>
                                </div>
                                <div class="col-md-2 mb-1">
                                    <button type="button" class="btn btn-primary btn-block"
                                        @click="dataUpdate();">Modificar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Data de salida -->
                    <div class="table-responsive w-100 ">
                        <br>
                        <table class="table table-hover">
                            <thead>
                                <tr class="table-primary">
                                    <th>Nombre</th>
                                    <td>Descripcion</td>
                                    <td>Protagonista</td>
                                    <td>Precio</td>
                                    <td>Director</td>
                                    <td>Productor</td>
                                    <td>Plataforma</td>
                                    <td>Fecha de Lanzamiento</td>
                                    <td>Imagen</td>
                                    <td>Editar</td>
                                    <td>Eliminar</td>
                                </tr>
                            </thead>
                            <tbody id="
                            3t">
                                <!-- Aqui llega la data de la API -->
                                <tr v-for="item in listData" :key="item.id">
                                    <td>{{ item.Nombre }}</td>
                                    <td>{{ item.Descripcion }}</td>
                                    <td>{{ item.Protagonista }}</td>
                                    <td>{{ item.Precio }}</td>
                                    <td>{{ item.Director }}</td>
                                    <td>{{ item.Productor }}</td>
                                    <td>{{ item.Plataforma }}</td>
                                    <td>{{ item.FechaLanzamiento }}</td>
                                    <td>{{ item.Imagen }}</td>
                                    <!-- boton para obtener el id de cada registro -->
                                    <td><button @click="findByid(item.id)" class="btn btn-info">Editar</button></td>
                                    <td><button @click="deleteById(item.id)" class="btn btn-danger">Eliminar</button></td>
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
import Swal from 'sweetalert2';

export default {
    name: 'TiendaJ',
    data() {
        return {
            id: 0,
            nombre: '',
            descripcion: '',
            protagonista: '',
            precio: '',
            director: '',
            productor: '',
            plataforma: '',
            fechaLanzamiento: '',
            imagen: '',
            listData: [],
            listPropertyType: []
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData: function () {
            axios.get('http://localhost:3000/api/juego/list').then(result => {
                this.listData = result.data;
                console.log('Datos cargados:', this.listData);
            });
        },
        findByid: function (id) {
            axios.get('http://localhost:3000/api/juego/find/' + id).then(result => {
                this.id = result.data.id;
                this.nombre = result.data.Nombre;
                this.descripcion = result.data.Descripcion;
                this.protagonista = result.data.Protagonista;
                this.precio = result.data.Precio;
                this.director = result.data.Director;
                this.productor = result.data.Productor;
                this.plataforma = result.data.Plataforma;
                this.fechaLanzamiento = result.data.FechaLanzamiento;
                this.imagen = result.data.Imagen;
            });
        },
        deleteById: function (id) {
            Swal.fire({
                title: '¿Desea eliminar el registro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Se eliminó!',
                        'Registro eliminado.',
                        'success'
                    );
                    axios.delete('http://localhost:3000/api/juego/delete/' + id).then(() => {
                        this.loadData();
                        this.clearList();
                    });
                }
            });
        },
        clearList: function () {
            this.id = 0,
                this.nombre = '',
                this.descripcion = '',
                this.protagonista = '',
                this.precio = '',
                this.director = '',
                this.productor = '',
                this.plataforma = '',
                this.fechaLanzamiento = '',
                this.imagen = '';
        },
        addData: function () {
            Swal.fire({
                title: '¿Desea guardar el registro?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: 'No guardar',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Registro almacenado con éxito!', '', 'success');
                    let data = {
                        Nombre: this.nombre,
                        Descripcion: this.descripcion,
                        Protagonista: this.protagonista,
                        Precio: this.precio,
                        Director: this.director,
                        Productor: this.productor,
                        Plataforma: this.plataforma,
                        FechaLanzamiento: this.fechaLanzamiento,
                        Imagen: this.imagen
                    };
                    axios.post('http://localhost:3000/api/juego/create', data).then(result => {
                        if (result.data) {
                            this.loadData();
                            this.clearList();
                        }
                    });
                } else if (result.isDenied) {
                    Swal.fire('Sin guardar cambios', '', 'info');
                }
            });
        },
        dataUpdate: function () {
            Swal.fire({
                title: '¿Desea modificar el registro?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Modificar',
                denyButtonText: 'No modificar',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Registro se almacenado con éxito!', '', 'success');
                    let data = {
                        nombre: this.nombre,
                        descripcion: this.descripcion,
                        protagonista: this.protagonista,
                        precio: this.precio,
                        director: this.director,
                        productor: this.productor,
                        plataforma: this.plataforma,
                        fechaLanzamiento: this.fechaLanzamiento,
                        imagen: this.imagen
                    };
                    axios.put('http://localhost:3000/api/juego/update/' + this.id, data).then(result => {
                        if (result.data) {
                            this.loadData();
                            this.clearList();
                        }
                    });
                } else if (result.isDenied) {
                    Swal.fire('Sin guardar cambios', '', 'info')
                }
            })
        }
    }
};
</script>


