'use strict';

module.exports = formatDate;

function formatDate(d) {
	var dParts;

	d = (new Date(d || null).toJSON());
	d = d.replace(/T.*/, '');
	dParts = d.split('-');
	dParts = [dParts[1], dParts[2], dParts[0]];

	return dParts.join('/');
}
