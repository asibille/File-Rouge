
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

class UserService {
  static async register(email, password) {
  if (!email || !password) throw new Error("Email et mot de passe requis"); 
  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email déjà utilisé');

  const hash = await bcrypt.hash(password, 10); 
  const user = await User.create({ email, password: hash });

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });
  return { user: { email: user.email, id: user._id }, token };
}


 static async login(email, password) {
  if (!email || !password) throw new Error("Email et mot de passe requis");
  const user = await User.findOne({ email });
  if (!user) throw new Error('Utilisateur introuvable');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Mot de passe incorrect');

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });
  return { user: { email: user.email, id: user._id }, token };
  }


  static async getUserById(id) {
    return User.findById(id).select('-password');
  }
}

module.exports = UserService;
