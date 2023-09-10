const collection = require('./collection'); // any Postman collection JSON file
const { transpile } = require('postman2openapi');

// Returns a JavaScript object representation of the OpenAPI definition.
const openapi = transpile(collection);

console.log(JSON.stringify(openapi, null, 2));