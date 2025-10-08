console.log("🚀 Lancement du serveur...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./Route/Route");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes API
app.use("/api", routes);

// ✅ Route de test simple pour Render
app.get("/", (req, res) => {
  res.send("🚀 Backend en ligne sur Render !");
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté");

    // ⚠️ Render impose d’utiliser process.env.PORT
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Serveur lancé sur le port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erreur MongoDB :", err);
    process.exit(1);
  }
};

// Ne pas lancer pendant les tests
if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = app;
