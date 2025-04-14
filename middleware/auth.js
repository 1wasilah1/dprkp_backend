
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token tidak valid' });
  }
};
// Middleware untuk cek role
const roleAuth = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ msg: 'Akses ditolak. Bukan ' + role + '.' });
      }
      next();
    };
  };
  
module.exports = { authMiddleware, roleAuth };
