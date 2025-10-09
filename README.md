
readme_content = """# 🚀 Projet Fil Rouge – Backend (Node.js + Express + MongoDB)

## 🧾 Description

Backend du projet **Fil Rouge**, développé avec **Node.js**, **Express** et **MongoDB (Mongoose)**.  
Il gère :

- ✅ L’authentification des utilisateurs (inscription, connexion, contact associé)
- 📇 La gestion des contacts (CRUD)
- ☎️ La validation des numéros de téléphone (10 à 20 chiffres)
- 📘 La documentation des API avec **Swagger**
- 🌐 La gestion des accès **CORS** pour le frontend déployé

---

## ⚙️ Installation

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/tonrepo/projet-fil-rouge.git
cd projet-fil-rouge/backend
2️⃣ Installer les dépendances
bash
Toujours afficher les détails

Copier le code
npm install
3️⃣ Configurer l’environnement
Créer un fichier .env à la racine du dossier backend :

env
Toujours afficher les détails

Copier le code
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=tonSecretJWT
FRONTEND_URL=https://file-rouge-1.onrender.com
▶️ Lancer le serveur
bash
Toujours afficher les détails

Copier le code
npm run start
Le serveur démarre sur :
👉 http://localhost:5000

🧱 Structure du projet
pgsql
Toujours afficher les détails

Copier le code
backend/
│── Controller/
│   ├── UserController.js
│   ├── ContactController.js
│
│── Service/
│   ├── UserService.js
│   ├── ContactService.js
│
│── Models/
│   ├── User.js
│   ├── Contact.js
│
│── Route/
│   ├── Route.js        
│
│── Middleware/
│   ├── authMiddleware.js
│
│── swagger.yaml
│── Server.js
│── package.json
│── .env

🔐 Authentification (Users)
POST /api/auth/register
Créer un utilisateur

Body :

json
Toujours afficher les détails

Copier le code
{
  "email": "test@example.com",
  "password": "123456"
}
POST /api/auth/login
Connexion utilisateur

Body :

json
Toujours afficher les détails

Copier le code
{
  "email": "test@example.com",
  "password": "123456"
}
Réponse :

json
Toujours afficher les détails

Copier le code
{
  "user": {
    "email": "test@example.com",
    "id": "68e284665f5eea59789d837f"
  },
  "token": "JWT_TOKEN"
}
👥 Contacts (CRUD)
Toutes les routes nécessitent un JWT valide dans le header Authorization.

GET /api/contacts
Récupérer tous les contacts de l’utilisateur.

POST /api/contacts
Créer un nouveau contact

Body :

json
Toujours afficher les détails

Copier le code
{
  "firstName": "John",
  "name": "Doe",
  "email": "john@example.com",
  "phone": "0606060606"
}
➡️ Le numéro de téléphone doit contenir entre 10 et 20 chiffres.

PATCH /api/contacts/:id
Modifier partiellement un contact

Exemple :

json
Toujours afficher les détails

Copier le code
{
  "phone": "0707070707"
}
DELETE /api/contacts/:id
Supprimer un contact

🧪 Exemples de requêtes
1️⃣ Avec curl
bash
Toujours afficher les détails

Copier le code
curl -X POST http://localhost:5000/api/contacts \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"firstName":"John","name":"Doe","email":"john@example.com","phone":"0606060606"}'
2️⃣ Avec Axios (frontend React)
js
Toujours afficher les détails

Copier le code
import axios from 'axios';

const token = "<TOKEN>";
const newContact = { firstName: "John", name: "Doe", email: "john@example.com", phone: "0606060606" };

axios.post("http://localhost:5000/api/contacts", newContact, {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => console.log(res.data))
.catch(err => console.error(err));
📘 Swagger API Docs
📍 Local :
http://localhost:5000/api-docs

🌍 En ligne (Render) :
https://file-rouge.onrender.com/api-docs

Swagger est chargé via swagger-ui-express et yamljs :

bash
Toujours afficher les détails

Copier le code
npm install swagger-ui-express yamljs
🧩 Tests
Les tests utilisent Jest et Supertest :

bash
Toujours afficher les détails

Copier le code
npm run test
Tests disponibles :
✅ Authentification (register / login)

✅ Contacts (CRUD)

✅ Vérification du token JWT

🧰 Technologies utilisées
Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

bcrypt.js (hash du mot de passe)

dotenv

Swagger UI

CORS

Jest 

🧭 Déploiement
Déployé sur Render.com :

Backend  → https://file-rouge.onrender.com

Frontend → https://file-rouge-1.onrender.com

SWAGGER  → https://file-rouge.onrender.com/api-docs/

Configuration du CORS dans Server.js :

js
Toujours afficher les détails

Copier le code
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://file-rouge-1.onrender.com"
}));
