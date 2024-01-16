<template>
    <div class="costManagement ">
        <div>
            <fieldset>
                <!-- Input formulario -->
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-md-6  ">

                            <legend>Guardar Clientes</legend>

                            <input type="hidden" v-model="id">
                            <input type="text" class="form-control sizeText mb-3" v-model="nombres" placeholder="Nombres">
                            <input class="form-control sizeText mb-3" v-model="apellidos" placeholder="Apellidos">
                            <input type="number" class="form-control sizeText mb-3" v-model="edad" placeholder="Edad">
                            <input type="text" class="form-control sizeText mb-3" v-model="tipoDocumento"
                                placeholder="Tipo de Documento">
                            <input type="text" class="form-control sizeText mb-3" v-model="numeroDocumento"
                                placeholder="numero de Documento">
                            <input type="text" class="form-control sizeText mb-3" v-model="email" placeholder="Email">
                            <input type="text" class="form-control sizeText mb-3" v-model="telefono" placeholder="Telefono">

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
                                    <th>Nombres</th>
                                    <td>Apellidos</td>
                                    <td>Edad</td>
                                    <td>TipoDocumento</td>
                                    <td>NumeroDocumento</td>
                                    <td>Email</td>
                                    <td>Telefono</td>
                                    <td>Editar</td>
                                    <td>Eliminar</td>
                                </tr>
                            </thead>
                            <tbody id="dataResult">
                                <!-- Aqui llega la data de la API -->
                                <tr v-for="item in listData" :key="item.id">
                                    <td>{{ item.Nombres }}</td>
                                    <td>{{ item.Apellidos }}</td>
                                    <td>{{ item.Edad }}</td>
                                    <td>{{ item.TipoDocumento }}</td>
                                    <td>{{ item.NumeroDocumento }}</td>
                                    <td>{{ item.Email }}</td>
                                    <td>{{ item.Telefono}}</td>
                                    <!-- boton para obtener el id de cada registro -->
                                    <td><button @click="findByid(item.id)">Editar</button></td>
                                    <td><button @click="deleteById(item.id)">Eliminar</button></td>
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
    name: 'ClienteR',
    data() {
        return {
            // Propiedades de tu modelo Cliente
            id: 0,
            nombres: '',
            apellidos: '',
            edad: '',
            tipoDocumento: '',
            numeroDocumento: '',
            email: '',
            telefono: '',
            listData: [],
            listPropertyType: []
        };
    },

    created() {
        this.loadData();
    },

    methods: {
        loadData: function () {
            axios.get('http://localhost:3000/api/cliente/list').then(result => {
                this.listData = result.data;
                console.log('Datos cargados:', this.listData);
            });
        },

        findByid: function (id) {
            axios.get('http://localhost:3000/api/cliente/find/' + id).then(result => {
                this.id = result.data.id;
                this.nombres = result.data.Nombres;
                this.apellidos = result.data.Apellidos;
                this.edad = result.data.Edad;
                this.tipoDocumento = result.data.TipoDocumento;
                this.numeroDocumento = result.data.Numerodocumento;
                this.email = result.data.Email;
                this.telefono = result.data.Telefono;
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
                    axios.delete('http://localhost:3000/api/cliente/delete/' + id).then(() => {
                        this.loadData();
                        this.clearList();
                    });
                }
            });
        },

        clearList: function () {
            this.id = 0,
                this.nombres = '',
                this.apellidos = '',
                this.edad = '';
                this.tipodocumento = '',
                this.numerodocumento = '',
                this.emai = '',
                this.telefono = '';
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
                        Nombres: this.nombres,
                        Apellidos: this.apellidos,
                        Edad: this.edad,
                        TipoDocumento: this.tipoDocumento,
                        NumeroDocumento: this.numeroDocumento,
                        Email: this.email,
                        Telefono: this.telefono
                        
                    };
                    axios.post('http://localhost:3000/api/cliente/create', data).then(result => {
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
                        nombres: this.nombres,
                        apellidos: this.apellidos,
                        edad: this.edad,
                        tipoDocumento: this.tipoDocumento,
                        numeroDocumento: this.numeroDocumento,
                        email: this.email,
                        telefono: this.telefono
                    };
                    axios.put('http://localhost:3000/api/cliente/update/' + this.id, data).then(result => {
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


