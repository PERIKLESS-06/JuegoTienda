<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Tienda Sophos</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link active" @click="closeNavbar()">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/estate/RegistroJuegos" class="nav-link" @click="closeNavbar()">Registro Juegos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/estate/RegistroClientes" class="nav-link" @click="closeNavbar()">Registro Clientes</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" @click="closeNavbar()">Consulta Alquilere</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    closeNavbar() {
      // Close the Bootstrap navbar when a router-link is clicked
      document.querySelector('.navbar-toggler').click();
    },
  },
};
</script>

<style scoped>
/* Your existing styles... */

</style>
