'use strict';

var resolve  = require('./resolve')
  , passthru = require('./passthru');

module.exports = function (data, context) {
	return passthru.apply(null, resolve(data, context));
};
