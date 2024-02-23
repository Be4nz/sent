const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Social Network Application \"sent\" API",
        version: "1.0.0",
        description: "This is the API documentation for the Social Network Application \"sent\", where users can interact and connect with each other. It provides endpoints for managing features and related functionalities.",
        termsOfService: "https://github.com/Be4nz/sent/blob/main/TERMS-OF-SERVICE.md",
        contact: {
          email: "support@sentapp.com",
        },
        license: {
            name: "undefined",
            url: "https://github.com/Be4nz/sent/blob/main/LICENSE.md",
        }
    },
      servers: [
        {
          url: "http://localhost:3001/api/v1",
        },
      ],
      tags: [
        {
            name: "Users",
            description: "Endpoints for managing users",
        }
      ],
    },
    apis: ["routes/*.js", "models/*.js"],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);