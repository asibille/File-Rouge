# 📌 Projet Fil Rouge – Backend (Node.js + Express + MongoDB)

## 🚀 Description

Backend du projet **Fil Rouge**, développé avec **Node.js**, **Express** et **MongoDB (Mongoose)**.
Il gère :

* L’authentification des utilisateurs (inscription, connexion, profil).
* La gestion de contacts (CRUD).
* La documentation des API avec **Swagger**.

---

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/tonrepo/projet-fil-rouge.git
cd projet-fil-rouge/backend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l’environnement

Créer un fichier **.env** à la racine du backend :

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=tonSecretJWT
```

### 4. Lancer le serveur

```bash
npm run start
```

✅ Le serveur tourne sur : `http://localhost:5000`

---

## 📂 Structure du projet

```
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
│   ├── Route.js        # Auth routes (login/register/me)
│   ├── ContactRoute.js # CRUD contacts
│
│── Middleware/
│   ├── authMiddleware.js
│
│── server.js
│── app.js
│── package.json
│── .env
```

---

## 🔐 Authentification (Users)

### 📌 POST /api/auth/register

Créer un utilisateur
Body :

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

### 📌 POST /api/auth/login

Connexion utilisateur
Body :

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

Réponse :

```json
{
  "user": {
    "email": "test@example.com",
    "id": "68e284665f5eea59789d837f"
  },
  "token": "JWT_TOKEN"
}
```

### 📌 GET /api/auth/me

Retourne les infos du user connecté (JWT obligatoire).

Header :

```
Authorization: Bearer <TOKEN>
```

---

## 📇 Contacts (CRUD)

Toutes les routes nécessitent un **JWT valide**.

### 📌 GET /api/contacts

Récupérer tous les contacts de l’utilisateur.

### 📌 POST /api/contacts

Créer un nouveau contact.
Body :

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0606060606"
}
```

### 📌 PATCH /api/contacts/:id

Modifier partiellement un contact.
Body :

```json
{
  "phone": "0707070707"
}
```

### 📌 DELETE /api/contacts/:id

Supprimer un contact.

---

## 📖 Swagger API Docs

Lancer le projet puis accéder à :
👉 `http://localhost:5000/api-docs`

Swagger inclut :

* Les routes **Auth (register, login)**
* Les routes **Contacts (CRUD)**

---

## 🛠️ Technologies

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcrypt.js (hash password)
* dotenv
* Swagger UI

---

