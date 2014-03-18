'use strict';

var compile = require('./compile')
  , resolve = require('./resolve-to-array');

module.exports = function (template, context) {
	return resolve(compile(template), context);
};
