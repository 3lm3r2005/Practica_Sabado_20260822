const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Autenticación y generación de JWT
exports.login = async (email, password) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }

  const passwordValido = await usuario.compararPassword(password);
  if (!passwordValido) {
    throw new Error('Credenciales inválidas');
  }

  const payload = {
    id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '8h'
  });

  return {
    token,
    usuario: payload
  };
};

// CRUD de Usuarios
exports.crearUsuario = async (datos) => {
  const nuevoUsuario = new Usuario(datos);
  const guardado = await nuevoUsuario.save();
  const usuarioObj = guardado.toObject();
  delete usuarioObj.password;
  return usuarioObj;
};

exports.listarUsuarios = async () => {
  return await Usuario.find().select('-password');
};

exports.buscarUsuarioPorId = async (id) => {
  return await Usuario.findById(id).select('-password');
};

exports.modificarUsuario = async (id, datos) => {
  if (datos.password) {
    const salt = await bcrypt.genSalt(10);
    datos.password = await bcrypt.hash(datos.password, salt);
  }
  return await Usuario.findByIdAndUpdate(id, datos, { new: true }).select('-password');
};

exports.removerUsuario = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};