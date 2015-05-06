'use strict';
var K = require('../constants');
var exports = module.exports = {};

exports.uuid = function() {
	/*jshint bitwise:false */
	var uuid = ''
		, i = 0
		, random
		;

	for (; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
			.toString(16);
	}

	return uuid;
}

exports.storage = function(d) {
	if (d) {
		return global.localStorage.setItem(K.STORE_KEY, JSON.stringify(d));
	}

	if (d === null) {
		return global.localStorage.removeItem(K.STORE_KEY);
	}

	var store = global.localStorage.getItem(K.STORE_KEY);

	return store && JSON.parse(store);
};