const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json'; // Output file for the spec
const routes = ['./app.js']; // Path to your API route files

const doc = {
  info: {
    title: 'Polytechnic Library API',
    description: 'API documentation for the Polytechnic Library',
  },
  host: 'localhost:5000', // Replace with your actual host if needed
  schemes: ['http'],
};

swaggerAutogen(outputFile, routes, doc);
