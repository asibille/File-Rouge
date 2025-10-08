const Contact = require('../Models/Contact');

class ContactService {
  static async getAll(userId) {
    if (!userId) throw new Error('UserId manquant');
    return await Contact.find({ userId });
  }

  static async create(data, userId) {
    if (!userId) throw new Error('UserId manquant pour créer le contact');
    const contact = new Contact({ ...data, userId });
    return await contact.save();
  }

  static async update(id, data, userId) {
    if (!userId) throw new Error('UserId manquant pour mettre à jour le contact');
    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId },
      { $set: data },
      { new: true }
    );
    if (!contact) throw new Error('Contact introuvable ou non autorisé');
    return contact;
  }

  static async delete(id, userId) {
    if (!userId) throw new Error('UserId manquant pour supprimer le contact');
    const contact = await Contact.findOneAndDelete({ _id: id, userId });
    if (!contact) throw new Error('Contact introuvable ou non autorisé');
    return contact;
  }
}

module.exports = ContactService;
