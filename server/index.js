// importar express
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');

const configs = require('./config');

const db = require('./config/database');
db.authenticate()
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error))

// configurar express
const app = express();

// middlewares
app.use(morgan('dev'));

// habilitar pug
app.set('view engine', 'pug');

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// cargar una carpeta estática
app.use(express.static('public'));

// Validar si estamos en desarollo o en producción
const config = configs[app.get('env')];

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra el año actual
app.use((req, res, next) => {
    // crea la fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    return next();
})

// rutas
app.use('/', routes());


const puerto = process.env.PORT || 3000;
app.listen(puerto);
console.log('Server on port:', puerto)