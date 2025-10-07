// server.js
console.log(" Lancement du serveur...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Route/Route');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connecté"))
  .catch((err) => console.error(" Erreur MongoDB :", err));

app.use('/api', routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server lancé sur http://localhost:${PORT}`));
