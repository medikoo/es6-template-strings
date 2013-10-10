'use strict';

var value     = require('es5-ext/object/valid-value')
  , normalize = require('es5-ext/object/normalize-options')

  , map = Array.prototype.map, keys = Object.keys;

module.exports = function (data, context) {
	var names;

	(value(data) && value(data.literals) && value(data.substitutions));
	context = normalize(context);
	names = keys(context);
	return [data.literals].concat((new Function(names.join(', '),
		'return [' + map.call(data.substitutions, function (expr) {
			return 'String(' + expr + ')';
		}).join(', ') + '];')).apply(null,
			names.map(function (name) { return context[name]; })));
};
