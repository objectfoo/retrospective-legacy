'use strict';
var K = require('../constants');

module.exports = localStore;

function localStore(d) {
	if (d) {
		return global.localStorage.setItem(K.STORE_KEY, JSON.stringify(d));
	}

	if (d === null) {
		return global.localStorage.removeItem(K.STORE_KEY);
	}

	var store = global.localStorage.getItem(K.STORE_KEY);

	return store && JSON.parse(store);
}
