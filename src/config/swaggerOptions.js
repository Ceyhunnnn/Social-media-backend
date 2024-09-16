const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Social Media Swagger Setup",
      description: "Simple Swagger Documentation",
      contact: {
        name: "Ceyhun",
      },
      servers: ["http://localhost:3001"],
    },
    schemes: ["http", "https"],
  },
  apis: ["./src/routes/*.js"],
};
module.exports = { swaggerOptions };
