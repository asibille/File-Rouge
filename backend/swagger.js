const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Projet Fil Rouge API",
      version: "1.0.0",
      description: "Documentation de l'API du Projet Fil Rouge",
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL
          ? `${process.env.RENDER_EXTERNAL_URL}/api`
          : "http://localhost:10000/api",
      },
    ],
  },
  apis: ["./Route/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
