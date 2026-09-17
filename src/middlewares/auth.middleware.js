const jwt = require('jsonwebtoken');

// Verificar validez del Token JWT (desde encabezado Authorization o cookie HttpOnly)
exports.verificarToken = (req, res, next) => {
  let token = null;

  // 1. Intentar obtener el token desde el encabezado Authorization (Bearer <TOKEN>)
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (authHeader) {
    token = authHeader;
  }

  // 2. Si no viene en el encabezado, intentar obtenerlo desde las cookies
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado: Token no proporcionado' });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
};

// Control de Acceso Basado en Roles (RBAC)
exports.permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        mensaje: 'Acceso prohibido: Permisos insuficientes'
      });
    }
    next();
  };
};