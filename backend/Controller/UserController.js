// Controller/UserController.js
const UserService = require('../Service/UserService');

class UserController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserService.register(email, password);
      res.status(201).json(result); // ✅ 201 = Created
    } catch (err) {
      if (err.message.includes('déjà utilisé')) {
        return res.status(400).json({ error: err.message }); // mauvais email
      }
      if (err.message.includes('requis')) {
        return res.status(400).json({ error: err.message }); // champs manquants
      }
      res.status(500).json({ error: 'Erreur serveur : ' + err.message });
    }
  }

  static async login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    res.json(result);
  } catch (err) {
    if (err.message === 'Utilisateur introuvable' || err.message === 'Mot de passe incorrect') {
      return res.status(401).json({ error: err.message });
    }
    res.status(400).json({ error: err.message });
  }
}
}

module.exports = UserController;
