module.exports = (roles) => {
  return (req, res, next) => {
    // req.user.role viene del middleware `auth`
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Acceso denegado: no tienes los permisos necesarios.' });
    }
    next();
  };
};