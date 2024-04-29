const collection = require('./FIS-API Postman.postman_collection.json'); // any Postman collection JSON file
const { transpile } = require('postman2openapi');

// Returns a JavaScript object representation of the OpenAPI definition.
const openapi = transpile(collection);

console.log(JSON.stringify(openapi, null, 2));