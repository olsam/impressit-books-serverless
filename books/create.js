'use strict';

const uuid = require('uuid');
const dynamodb = require('../helpers/dynamodb');
const utils = require('../helpers/utils');

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  
  const data = JSON.parse(event.body);

  const validationErrors = utils.validateBody(data);

  if (validationErrors.length > 0) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: validationErrors.join(' '),
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      uuid: uuid.v1(),
      name: data.name,
      releaseDate: timestamp,
      authorName: data.authorName
    },
  };

 dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t add the book.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
