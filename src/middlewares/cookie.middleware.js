const COOKIE_NAME = 'token';

const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000 // 24 horas
};

// Adjunta el token en una cookie HttpOnly
const adjuntarTokenCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, cookieConfig);
};

// Limpia la cookie del token al cerrar sesión
const limpiarTokenCookie = (res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });
};

// Middleware para interceptar la respuesta de login y adjuntar la cookie
const adjuntarCookieMiddleware = (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    if (data && data.token) {
      adjuntarTokenCookie(res, data.token);
    }
    return originalJson(data);
  };
  next();
};

module.exports = {
  COOKIE_NAME,
  cookieConfig,
  adjuntarTokenCookie,
  limpiarTokenCookie,
  adjuntarCookieMiddleware
};
