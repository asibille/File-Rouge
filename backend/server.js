console.log("🚀 Lancement du serveur...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./Route/Route");
require("dotenv").config();

const app = express();

// ✅ CORS : autoriser ton frontend Render
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));

app.use(express.json());

// Routes API
app.use("/api", routes);

// ✅ Connexion MongoDB uniquement si on n’est pas en test
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB connecté");
      const PORT = process.env.PORT || 10000;
      app.listen(PORT, () =>
        console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
      );
    })
    .catch((err) => console.error("❌ Erreur MongoDB :", err));
}

// ✅ Exporter l’app pour Jest / Supertest
module.exports = app;
