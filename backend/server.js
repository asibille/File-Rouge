console.log("🚀 Lancement du serveur...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./Route/Route");
require("dotenv").config();

const app = express();

// ⚡ CORS : autoriser uniquement le frontend Render
app.use(cors({
  origin: "https://file-rouge.onrender.com", // remplace par ton URL frontend Render
  credentials: true
}));

app.use(express.json());

// Routes API
app.use("/api", routes);

// Connexion MongoDB uniquement si pas en test
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB connecté");

      // PORT dynamique pour Render
      const PORT = process.env.PORT || 10000;
      app.listen(PORT, () => {
        console.log(`✅ Serveur lancé sur le port ${PORT}`);
        console.log(`🌐 Accessible sur ${process.env.FRONTEND_URL || "https://file-rouge.onrender.com"}`);
      });
    })
    .catch((err) => console.error("❌ Erreur MongoDB :", err));
}

// Exporter l’app pour tests
module.exports = app;
