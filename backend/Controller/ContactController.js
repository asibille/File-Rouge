// ContactController.js
const ContactService = require('../Service/ContactService');

class ContactController {
  static async getAll(req, res) {
    try {
      const contacts = await ContactService.getAll(req.user.id);
      res.json(contacts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { name, firstName, phone } = req.body; 
      if (!firstName || !name) {
        return res.status(400).json({ error: 'Le prénom et le nom sont obligatoires.' });
      }
      if (!phone || phone.length < 10 || phone.length > 20) {
        return res.status(400).json({ error: 'Le numéro de téléphone doit contenir entre 10 et 20 caractères.' });
      }
      const contact = await ContactService.create(req.body, req.user.id);
      res.status(201).json(contact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { firstName, name, phone } = req.body;
      if (!firstName?.trim() || !name?.trim()) {
        return res.status(400).json({ error: 'Le prénom et le nom sont requis.' });
      }
      if (!phone || phone.length < 10 || phone.length > 20 || !/^\d+$/.test(phone)) {
        return res.status(400).json({ error: 'Le numéro de téléphone doit contenir entre 10 et 20 chiffres.' });
      }
      const contact = await ContactService.update(req.params.id, req.body, req.user.id);
      res.json(contact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await ContactService.delete(req.params.id, req.user.id);
      res.json({ message: "Contact supprimé" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = ContactController;
