'use strict';

module.exports = function (str) {
	var current = '', length, literals = [], substitutions = []
	  , sOut, sEscape, sAhead, sIn, sInEscape, state, i;

	str = String(str);
	length = str.length;
	sOut = function (char) {
		if (char === '\\') return sEscape;
		if (char === '$') return sAhead;
		current += char;
		return sOut;
	};
	sEscape = function (char) {
		if ((char !== '\\') && (char !== '$')) current += '\\';
		current += char;
		return sOut;
	};
	sAhead = function (char) {
		if (char === '{') {
			literals.push(current);
			current = '';
			return sIn;
		}
		current += '$' + char;
		return sOut;
	};
	sIn = function (char) {
		if (char === '\\') return sInEscape;
		if (char === '}') {
			substitutions.push(current);
			current = '';
			return sOut;
		}
		current += char;
		return sIn;
	};
	sInEscape = function (char) {
		if ((char !== '\\') && (char !== '}')) current += '\\';
		current += char;
		return sIn;
	};

	state = sOut;
	for (i = 0; i < length; ++i) state = state(str[i]);
	if (state === sOut) {
		literals.push(current);
	} else if (state === sEscape) {
		literals.push(current + '\\');
	} else if (state === sAhead) {
		literals.push(current + '$');
	} else if (state === sIn) {
		literals[literals.length - 1] += '${' + current;
	} else if (state === sInEscape) {
		literals[literals.length - 1] += '${' + current + '\\';
	}
	return { literals: literals, substitutions: substitutions };
};
