const usuarioService = require('../services/usuario.service');
const { adjuntarTokenCookie, limpiarTokenCookie } = require('../middlewares/cookie.middleware');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await usuarioService.login(email, password);
    adjuntarTokenCookie(res, resultado.token);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  limpiarTokenCookie(res);
  res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
};

exports.crear = async (req, res) => {
  try {
    const resultado = await usuarioService.crearUsuario(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerTodos = async (req, res) => {
  try {
    const resultado = await usuarioService.listarUsuarios();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerUno = async (req, res) => {
  try {
    const resultado = await usuarioService.buscarUsuarioPorId(req.params.id);
    if (!resultado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const resultado = await usuarioService.modificarUsuario(req.params.id, req.body);
    if (!resultado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const resultado = await usuarioService.removerUsuario(req.params.id);
    if (!resultado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};