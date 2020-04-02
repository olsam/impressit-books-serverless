'use strict';

const dataSchema = {
	'name': 'string',
	'releaseDate': 'number',
	'authorName': 'string'
};

function validateBody(body) {
  return Object.keys(dataSchema).reduce(function (acc, key) {
    if (body[key] == undefined) {
      acc.push(`Field "${key}" is required.`)
    }
    if (typeof body[key] !== dataSchema[key]) {
      acc.push(`Field "${key}" should be a "${dataSchema[key]}".`)
    }
    return acc
  }, [])
}

module.exports = {
	validateBody: validateBody
};