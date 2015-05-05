'use strict';

module.exports = Store;

var eventEmitter = require('event-emitter');

Store.prototype.getAll = getStorage;

function Store(dispatcher) {
	this.ee = eventEmitter();
	this.storage = global.localStorage;

	dispatcher.register(doAction);

	return ee;
}

function getStorage() {
	return JSON.parse(storage.getItem(KEY_STORAGE));
}

function uuid() {
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
