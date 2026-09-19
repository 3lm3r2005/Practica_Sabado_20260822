const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const estudianteRoutes = require('./routes/estudiante.routes');
const cursoRoutes = require('./routes/curso.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

// Configuración de CORS (acepta varios orígenes separados por coma en CLIENT_URL)
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim());

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-use-cookie']
};

app.use(cors(corsOptions)); // Aplicar CORS globalmente
app.use(express.json());
app.use(cookieParser());

// Registro de Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/cursos', cursoRoutes);

module.exports = app;