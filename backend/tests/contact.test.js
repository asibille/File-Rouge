// tests/contact.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Assure-toi d'exporter app dans server.js

let token;
let userId;
let contactId;

beforeAll(async () => {
  if (!process.env.MONGO_URI_TEST) {
    throw new Error("MONGO_URI_TEST non défini dans .env");
  }

  // Connexion à MongoDB Atlas pour les tests
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // Création d'un utilisateur pour l'auth
  const userRes = await request(app)
    .post("/api/auth/register")
    .send({ email: "contactuser@test.com", password: "123456" });

  // Vérifie que le token est présent
  token = userRes.body.token;
  userId = userRes.body.user._id || userRes.body.user.id;

  if (!token) {
    throw new Error("Token JWT non reçu après l'inscription de test");
  }
});

afterAll(async () => {
  // Supprime toutes les données de test et déconnecte
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  }
});

describe("📇 Contacts API", () => {
  it("➡️ Devrait créer un contact", async () => {
    const res = await request(app)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({ firstName: "Jean", name: "Dupont", phone: "0612345678" });

    expect(res.statusCode).toBe(201); // Création retourne 201
    expect(res.body.firstName).toBe("Jean");
    expect(res.body.name).toBe("Dupont");
    contactId = res.body._id;
  });

  it("➡️ Devrait récupérer tous les contacts", async () => {
    const res = await request(app)
      .get("/api/contacts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("➡️ Devrait mettre à jour un contact", async () => {
    const res = await request(app)
      .patch(`/api/contacts/${contactId}`) // PATCH correspond à ta route
      .set("Authorization", `Bearer ${token}`)
      .send({ firstName: "Paul", name: "Durand", phone: "0699999999" });

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Paul");
    expect(res.body.name).toBe("Durand");
    expect(res.body.phone).toBe("0699999999");
  });

  it("➡️ Devrait supprimer le contact", async () => {
    const res = await request(app)
      .delete(`/api/contacts/${contactId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
