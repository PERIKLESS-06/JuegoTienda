<template>
  <div class="text-center">
    <div class="card mb-3 position-relative">
      <img src="https://images.unsplash.com/photo-1581351123004-757df051db8e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="card-img" alt="Card image" style="height: 750px; object-fit: cover;">
      <div class="card-img-overlay d-flex align-items-center">
        <div class="container text-white text-center">
          <h1 class="display-3">Bienvenidos a Games Sophos</h1>
          <p class="lead">Esta es una página desarrollada para el arriendo de videojuegos de diferentes plataformas</p>
        </div>
      </div>
    </div>

    <!-- Carrusel de tarjetas -->
    <div class="row">
      <div class="col-lg-12">
        <!-- Botones de selección de plataforma -->
        <div class="mb-3">
          <button @click="selectPlatform('playstation')" class="btn btn-secondary">PlayStation</button>
          <button @click="selectPlatform('xbox')" class="btn btn-secondary">Xbox</button>
          <button @click="selectPlatform('nintendo')" class="btn btn-secondary">Nintendo</button>
          <button @click="selectPlatform('pc')" class="btn btn-secondary">PC</button>
        </div>

        <input type="hidden" v-model="id">
        
        <div class="d-flex justify-content-between align-items-center">
          <button @click="prevSlide" class="btn btn-secondary align-self-center" style="margin-right: 30px;">Anterior</button>
          <div class="card-container d-flex flex-wrap justify-content-center">
            <div v-for="(game, index) in visibleGames" :key="index" class="card mb-3" style="width: 18rem; margin: 0 10px;">
              <img :src="game.Imagen" class="card-img-top" alt="Game Image">
              <div class="card-body">
                <h5 class="card-title">{{ game.Nombre }}</h5>
              </div>
              <div class="card-footer">
                <button @click="rentGame(game)" class="btn btn-primary">Alquilar</button>
                <button @click="showDescription(game)" class="btn btn-secondary">Ver Descripción</button>
              </div>
            </div>
          </div>
          <button @click="nextSlide" class="btn btn-secondary align-self-center" style="margin-left: 30px;">Siguiente</button>
        </div>
      </div>
    </div>

    <!-- Modal para la descripción del juego -->
    <div v-if="isDescriptionModalVisible" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedGame.Nombre }}</h5>
            <button @click="isDescriptionModalVisible = false" type="button" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ selectedGame.Descripcion }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'GameCarousel',
  data() {
    return {
      listData: [],
      selectedGame: {},
      isDescriptionModalVisible: false,
      activeIndex: 0,
      platformFilter: null,
    };
  },
  computed: {
    visibleGames() {
      const filteredGames = this.listData.filter(game => !this.platformFilter || game.Plataforma.toLowerCase() === this.platformFilter);
      const startIndex = this.activeIndex;
      const endIndex = startIndex + 3;
      return filteredGames.slice(startIndex, endIndex < filteredGames.length ? endIndex + 1 : filteredGames.length);
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.get('http://localhost:3000/api/juego/list')
        .then(result => {
          this.listData = result.data; // Ajusta esto según la estructura real de tu respuesta API
        })
        .catch(error => {
          console.error('Error al cargar datos:', error);
        });
    },
    rentGame(game) {
      Swal.fire({
        title: 'Alquilar Juego',
        text: `¿Deseas alquilar ${game.Nombre} ?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Alquilar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.redirectToAlquileres(game.Nombre, new Date().toISOString().split('T')[0])
        }
      });
    },
    showDescription(game) {
      this.selectedGame = game;
      this.isDescriptionModalVisible = true;
    },
    prevSlide() {
      this.activeIndex = (this.activeIndex - 1 + this.listData.length) % this.listData.length;
    },
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.listData.length;
    },
    selectPlatform(platform) {
      this.platformFilter = platform;
      this.activeIndex = 0; // Reiniciar el índice al cambiar de plataforma
    },
    redirectToAlquileres(nombre, fecha) {
      // Ajusta la lógica de redirección según la estructura de tus rutas
      this.$router.push({ name: 'Alquileres', query: { nombre, fecha } });
    },
  },
};
</script>
