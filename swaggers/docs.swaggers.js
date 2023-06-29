const swaggerJSDoc = require('swagger-jsdoc');



const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CBT APP',
    version: '1.0.0',
    description: 'This is a software developed by Lampnet associate intern, Patrick Oloye',
    
  },
  servers: [
    {
      url: 'http://localhost:9000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes:{
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            data: "application/bearer+json; charset=utf-8",
            bearerFormat: [ "JWT", "HS256", "HS384", "HS512", "bcrypt" ],
        }
    }
  },
  security: [
    {
        bearerAuth: [],
    }
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);



module.exports = swaggerSpec;