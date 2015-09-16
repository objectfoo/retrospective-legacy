'use strict';

module.exports = localStore;

var STORE_KEY = 'retrospective-react-reflux';

function localStore(d) {
	if (d) {
		return global.localStorage.setItem(STORE_KEY, JSON.stringify(d));
	}

	if (d === null) {
		return global.localStorage.removeItem(STORE_KEY);
	}

	var store = global.localStorage.getItem(STORE_KEY);

	return store && JSON.parse(store);
}
