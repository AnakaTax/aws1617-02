'use strict';

const express = require('express');
const app = express();
const path = require('path');
const port = ( process.env.PORT || 3000);

const bodyParser = require('body-parser');
const researchers = require("./routes/researchers");
const baseApi = '/api/v1';
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDef');

// Used to logs all API calls
app.use(logger('dev'));

// Configuration of body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configuration of API documentation
// Options for swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // Path to the API docs
  apis: ['./api-documentation.yaml'],
};

const optionsSwaggerUi = {
    validatorUrl : null
}

const swaggerSpec = swaggerJSDoc(options);

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, optionsSwaggerUi));

// Configuration of statics
app.use('/', express.static(path.join(__dirname + '/public')));

app.use(baseApi + '/researchers', researchers);

app.listen(port, () => {
    console.log('Server up and running');
});