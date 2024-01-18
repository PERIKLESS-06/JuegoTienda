import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/estate/RegistroJuegos',
    name: 'RegistroJuegos',   
    component: () => import('../views/estate/RegistroJuegos.vue')
  },
  
  {
    path: '/estate/RegistroClientes',
    name: 'RegistroClientes',   
    component: () => import('../views/estate/RegistroClientes.vue')
  },

  {
    path: '/estate/Alquileres',
    name: 'Alquileres',
    component: () => import('../views/estate/Alquileres.vue')
  },

  {
    path: '/estate/ConsultaAlquiler',
    name: 'ConsultaAlquiler',
    component: () => import('../views/estate/ConsultaAlquiler.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
