const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const estudianteRoutes = require('./routes/estudiante.routes');
const cursoRoutes = require('./routes/curso.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

// Configuración de CORS con soporte para cookies/credenciales
const corsOptions = {
  origin: process.env.CLIENT_URL && process.env.CLIENT_URL !== '*' ? process.env.CLIENT_URL : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); // Aplicar CORS globalmente
app.use(cookieParser()); // Parser de cookies HttpOnly
app.use(express.json());

// Registro de Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/cursos', cursoRoutes);

module.exports = app;