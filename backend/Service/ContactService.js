const Contact = require('../models/Contact');

class ContactService {
  static async getAll(userId) {
    return await Contact.find({ userId });
  }

  static async create(data, userId) {
    const contact = new Contact({ ...data, userId });
    return await contact.save();
  }

  static async update(id, data, userId) {
    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId },
      { $set: data },
      { new: true }
    );
    if (!contact) throw new Error("Contact introuvable ou non autorisé");
    return contact;
  }

  static async delete(id, userId) {
    const contact = await Contact.findOneAndDelete({ _id: id, userId });
    if (!contact) throw new Error("Contact introuvable ou non autorisé");
    return contact;
  }
}

module.exports = ContactService;
