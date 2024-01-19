# Tienda Sophos

Este repositorio contiene el código fuente completo de la aplicación web "Tienda Sophos". La plataforma está diseñada para facilitar el proceso de arriendo de videojuegos de diferentes plataformas. El proyecto está dividido en dos partes: el frontend, construido con Vue.js, y el backend, construido con Node.js y Express, utilizando MySQL como base de datos.


## Por qué utilizar Node.js y Vue.js 3

- **Node.js**:
  - **Eficiencia del Lado del Servidor**: Node.js permite ejecutar JavaScript del lado del servidor, brindando eficiencia y coherencia en el desarrollo de aplicaciones.
  - **Manejo Asíncrono**: Su modelo de I/O no bloqueante permite un manejo eficiente de operaciones de entrada/salida, adecuado para aplicaciones escalables.
  - **Amplia Comunidad y Módulos**: La amplia comunidad y el vasto ecosistema de módulos facilitan el desarrollo de aplicaciones robustas.

- **Vue.js 3**:
  - **Mejor Rendimiento**: La versión 3 de Vue.js ofrece un rendimiento mejorado en comparación con las versiones anteriores.
  - **Sistema de Composición Mejorado**: El sistema de composición mejorado facilita la organización y reutilización del código.
  - **Mejoras en la Reactividad**: La reactividad mejorada proporciona un estado más eficiente y actualizaciones más rápidas en la interfaz de usuario.


## Funcionalidades Principales

### Registro de Juegos
Accede a la sección "Registro Juegos" para añadir nuevos videojuegos a la tienda. Completa la información requerida y guarda los registros.

### Registro de Clientes
Utiliza la sección "Registro Clientes" para gestionar la información de los clientes. Agrega, modifica o elimina registros según sea necesario.

### Consulta de Alquileres
Explora los detalles de los alquileres en la sección "Consulta Alquiler". Filtra por fecha, nombre de juego o cliente para obtener información detallada.

### Carrusel de Juegos
En la página principal, encuentra un carrusel de juegos disponibles. Puedes navegar entre ellos y alquilar tus favoritos.

## Tecnologías Utilizadas

- **Vue.js**: Framework JavaScript para construir interfaces de usuario.
- **Bootstrap**: Framework CSS para el diseño de la interfaz.
- **Axios**: Cliente HTTP basado en promesas para realizar solicitudes a la API.
- **SweetAlert2**: Biblioteca para crear alertas y diálogos interactivos.
- **Vue Router**: Enrutador oficial para aplicaciones Vue.js de una sola página.

## Estructura del Proyecto

La estructura del proyecto sigue las convenciones estándar de un proyecto Vue.js. Aquí hay algunas carpetas y archivos clave:

- **src/**: Contiene el código fuente de la aplicación.
- **public/**: Contiene archivos estáticos como imágenes y el archivo index.html.
- **package.json**: Archivo de configuración del proyecto con dependencias y scripts.
## Backend

### Instalación

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/PERIKLESS-06/JuegoTienda.git



## Acceder al Directorio del Proyecto:
```bash
 cd SophosTienda
 npm install
 ```

    
## Configuración

2. **Asegúrate de modificar el archivo .env con la información correspondiente para la conexión a la base de datos MySQL.**

   ```env
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=your_mysql_database

## Ejecución:

  ```bash
   npm start
   ```
**El servidor estará disponible en http://localhost:3000.**
## Base de Datos

Asegúrate de tener una instancia de MySQL en ejecución y configura las variables de entorno correspondientes en el archivo .env.

API Endpoints
GET /api/juego/list: Obtener la lista de juegos.

GET /api/cliente/list: Obtener la lista de clientes.

GET /api/alquiler/list: Obtener la lista de alquileres.

Para obtener detalles sobre otros endpoints y sus usos, consulta la documentación de la API o revisa el código fuente.


## API Reference

**Rutas Cliente**

```javascript
app.post('/api/cliente/create', clienteController.create);
app.get('/api/cliente/list', clienteController.list);
app.get('/api/cliente/findById/:id', clienteController.findById);
app.get('/api/cliente/findByNumeroDocumento/:NumeroDocumento', clienteController.findByNumeroDocumento);
app.put('/api/cliente/update/:identifier', clienteController.updateCliente);
app.delete('/api/cliente/delete/:identifier', clienteController.destroy);
```

**Rutas juegos**
```javascript
app.post('/api/juego/create', juegoController.create);
app.get('/api/juego/list', juegoController.list);
app.get('/api/juego/findById/:id', juegoController.findByID);
app.get('/api/juego/findByName/:nombre', juegoController.findByName);
app.put('/api/juego/update/:identifier', juegoController.updateJuego);
app.delete('/api/juego/delete/:identifier', juegoController.destroy);
```

**Rutas alquiler**
```javascript

app.post('/api/alquiler/create', alquilerController.create);
app.get('/api/alquiler/list', alquilerController.list);
app.get('/api/alquiler/find/:id', alquilerController.findById);
app.put('/api/alquiler/update/:id', alquilerController.updateAlquiler);
app.delete('/api/alquiler/delete/:id', alquilerController.destroy);
app.get('/api/alquiler/cliente/:cliente_id', alquilerController.getAlquileresPorClienteId);
app.get('/api/alquiler/most-frequent-customer', alquilerController.getMostFrequentCustomer);
app.get('/api/alquiler/most-rented-game', alquilerController.getMostRentedGame);
app.get('/api/alquiler/least-rented-game-by-age', alquilerController.getLeastRentedGameByAge);
```

## Frontend

**Descripción del Frontend**

El frontend utiliza Vue.js y Bootstrap para proporcionar una interfaz de usuario intuitiva. La página principal muestra una selección de juegos disponibles para alquilar, con opciones para filtrar por plataforma y realizar alquileres.
## instalacion
```bash
cd tiendafront
npm install  
 ```