'use strict';

module.exports = eqId;

function eqId(id) {
	return function(item) {
		return item.id === id;
	};
}
