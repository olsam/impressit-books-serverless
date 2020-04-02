'use strict';

const dynamodb = require('../helpers/dynamodb');
const utils = require('../helpers/utils');

module.exports.update = (event, context, callback) => {
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
    Key: {
      uuid: event.pathParameters.uuid,
    },
    ExpressionAttributeNames: {
      '#book_name': 'name',
      '#book_releaseDate': 'releaseDate',
      '#book_authorName': 'authorName',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':releaseDate': data.releaseDate,
      ':authorName': data.authorName,
    },
    UpdateExpression: 'SET #book_name = :name, #book_releaseDate = :releaseDate, #book_authorName = :authorName',
    ReturnValues: 'ALL_NEW',
  };

  dynamodb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t update the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
