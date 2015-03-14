'use strict';

var value     = require('es5-ext/object/valid-value')
  , normalize = require('es5-ext/object/normalize-options')

  , map = Array.prototype.map, keys = Object.keys
  , stringify = JSON.stringify;

module.exports = function (data, context) {
	var names, result, argNames, argValues;

	(value(data) && value(data.literals) && value(data.substitutions));
	context = normalize(context);
	names = keys(context);
	argNames = names.join(', ');
	argValues = names.map(function (name) { return context[name]; });
	try {
		result = (new Function(argNames,
			'return [' + map.call(data.substitutions, function (expr) {
				return expr ? '(' + expr + ')' : '\'\'';
			}).join(', ') + '];')).apply(null, argValues);
	} catch (e) {
		names.forEach(function (name, index) {
			var expr = data.substitutions[index]
			  , body = 'return ' + (expr ? ('(' + expr + ')') : '\'\'')
			  , fn;
			try {
				fn = new Function(argNames, body);
			} catch (e) {
				throw new TypeError("Unable to compile expression:\n\targs: " + stringify(argNames) +
					"\n\tbody: " + stringify(body) + "\n\terror: " + e.stack);
			}
			try {
				fn.apply(null, argValues);
			} catch (e) {
				throw new TypeError("Unable to resolve expression:\n\targs: " + stringify(argNames) +
					"\n\tbody: " + stringify(body) + "\n\terror: " + e.stack);
			}
		});
		throw e;
	}
	return [data.literals].concat(result);
};
