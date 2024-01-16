const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const http = require('http');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configura CORS
app.use(cors());

// Importa las rutas
require('./routes')(app);

// Ruta de bienvenida
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome.',
}));

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
