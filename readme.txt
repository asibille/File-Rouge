# Projet Fil Rouge – Backend (Node.js + Express + MongoDB)

Description:
Backend du projet Fil Rouge, développé avec Node.js, Express et MongoDB (Mongoose).
Il gère :
- L’authentification des utilisateurs (inscription, connexion, profil)
- La gestion de contacts (CRUD), incluant firstName, name, email, phone
- La validation des numéros de téléphone (10 à 20 chiffres)
- La documentation des API avec Swagger

Installation:

1. Cloner le projet
git clone https://github.com/tonrepo/projet-fil-rouge.git
cd projet-fil-rouge/backend

2. Installer les dépendances
npm install

3. Configurer l’environnement
Créer un fichier .env à la racine du backend :
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=tonSecretJWT

4. Lancer le serveur
npm run start

Le serveur tourne sur : http://localhost:5000

Structure du projet:

backend/
│── Controller/
│   ├── UserController.js
│   ├── ContactController.js
│
│── Service/
│   ├── UserService.js
│   ├── ContactService.js
│
│── models/
│   ├── User.js
│   ├── Contact.js
│
│── Route/
│   ├── Route.js        # Auth routes (login/register)
│── Middleware/
│   ├── authMiddleware.js
│
│── server.js
│── app.js
│── package.json
│── .env

Authentification (Users):

POST /api/auth/register
Créer un utilisateur
Body:
{
  "email": "test@example.com",
  "password": "123456"
}

POST /api/auth/login
Connexion utilisateur
Body:
{
  "email": "test@example.com",
  "password": "123456"
}
Réponse:
{
  "user": {
    "email": "test@example.com",
    "id": "68e284665f5eea59789d837f"
  },
  "token": "JWT_TOKEN"
}

Contacts (CRUD):

Toutes les routes nécessitent un JWT valide.

GET /api/contacts
Récupérer tous les contacts de l’utilisateur.

POST /api/contacts
Créer un nouveau contact
Body:
{
  "firstName": "John",
  "name": "Doe",
  "email": "john@example.com",
  "phone": "0606060606"
}
Le phone doit contenir entre 10 et 20 chiffres.

PATCH /api/contacts/:id
Modifier partiellement un contact
Body exemple:
{
  "phone": "0707070707"
}

DELETE /api/contacts/:id
Supprimer un contact

Exemples de requêtes:

1. Avec curl
Créer un contact:
curl -X POST http://localhost:5000/api/contacts \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"firstName":"John","name":"Doe","email":"john@example.com","phone":"0606060606"}'

2. Avec Axios (frontend React)
import axios from 'axios';

const token = "<TOKEN>";
const newContact = { firstName: "John", name: "Doe", email: "john@example.com", phone: "0606060606" };

axios.post("http://localhost:5000/api/contacts", newContact, {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => console.log(res.data))
.catch(err => console.error(err));

Swagger API Docs:
Lancer le projet puis accéder à :
http://localhost:5000/api-docs

Technologies:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt.js (hash password)
- dotenv
- Swagger UI
