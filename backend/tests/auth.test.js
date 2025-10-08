const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Assure-toi d'exporter app dans server.js
const User = require('../Models/User');

beforeAll(async () => {
  if (!process.env.MONGO_URI_TEST) {
    throw new Error('MONGO_URI_TEST non défini');
  }
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    dbName: 'projet_fil_rouge_test', // force la DB de test
  });
});
afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  }
});

describe("🔐 Tests Auth API", () => {
  const testUser = { email: "test@example.com", password: "123456" };

  it("➡️ Devrait enregistrer un nouvel utilisateur", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.token).toBeDefined();
  });

  it("➡️ Devrait se connecter avec le compte créé", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.token).toBeDefined();
  });

  it("➡️ Devrait refuser la connexion avec un mauvais mot de passe", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  it("➡️ Devrait refuser la connexion avec un email inexistant", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "noexist@example.com", password: "123456" });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBeDefined();
  });
});
