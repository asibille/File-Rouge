const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secret123';

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Token manquant' });

  const token = auth.split(' ')[1]; 
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user ={id: decoded.id};
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide' });
  }
};
