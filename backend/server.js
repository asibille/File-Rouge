const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./Route/Route");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://file-rouge-1.onrender.com"
}));

app.use(express.json());


app.use("/api", routes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connecté");
      const PORT = process.env.PORT || 10000;
      app.listen(PORT, () =>
        console.log(`Serveur lancé sur http://localhost:${PORT}`)
      );
    })
    .catch((err) => console.error("Erreur MongoDB :", err));
}

module.exports = app;
