require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./Models/Contact');

async function main() {
  try {
    console.log('📡 Connexion à MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' Connecté à MongoDB Atlas');

    const userId = '68e284665f5eea59789d837f';

    console.log(` Recherche des contacts pour l'utilisateur ${userId}...`);
    const contacts = await Contact.find({ userId });

    if (contacts.length === 0) {
      console.log(' Aucun contact trouvé pour cet utilisateur.');
    } else {
      console.log(` ${contacts.length} contact(s) trouvé(s) :`);
      contacts.forEach((c, index) => {
        console.log(`${index + 1}. ${c.firstName} ${c.name} — ${c.phone} — ${c.email}`);
      });
    }

    await mongoose.disconnect();
    console.log('🔌 Déconnexion de MongoDB réussie');
  } catch (err) {
    console.error(' Erreur :', err.message);
  }
}

main();
