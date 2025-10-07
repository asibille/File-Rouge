const ContactService = require('../Service/ContactService');

class ContactController {
  static async getAll(req, res) {
    try {
      const contacts = await ContactService.getAll(req.userId);
      res.json(contacts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async create(req, res) {
  try {
    const { name, firstName, phone } = req.body; // ✅ inclure firstName

    if (!firstName || !name) {
      return res.status(400).json({ error: 'Le prénom et le nom sont obligatoires.' });
    }

    if (!phone || phone.length < 10 || phone.length > 20) {
      return res.status(400).json({ error: 'Le numéro de téléphone doit contenir entre 10 et 20 caractères.' });
    }

    const contact = await ContactService.create(req.body, req.userId);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

  static async update(req, res) {
    try {
      const { firstName, lastName, phone } = req.body;

      // Validation des champs
      if (!firstName?.trim() || !lastName?.trim()) {
        return res.status(400).json({ error: 'Le prénom et le nom sont requis.' });
      }
      if (!phone || phone.length < 10 || phone.length > 20 || !/^\d+$/.test(phone)) {
        return res.status(400).json({ error: 'Le numéro de téléphone doit contenir entre 10 et 20 chiffres.' });
      }

      const contact = await ContactService.update(req.params.id, req.body, req.userId);
      res.json(contact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await ContactService.delete(req.params.id, req.userId);
      res.json({ message: "Contact supprimé" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = ContactController;
