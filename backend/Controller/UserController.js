
const UserService = require('../Service/UserService');

class UserController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserService.register(email, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

}

module.exports = UserController;
