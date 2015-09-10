'use strict';

module.exports = first;

function first(a) {
	if (Array.isArray(a)) {
		return a[0];
	}

	return null;
}
