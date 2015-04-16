'use strict';

var sampleData = require('../sampleData.json');
var AppDispatcher = require('../AppDispatcher');
var eventEmitter = require('event-emitter');
var KEY_STORAGE = 'retrospective-react';
var storage;

function RetrospectiveStore() {
	storage = global.localStorage;
	AppDispatcher.register(doAction);

	if (storeIsEmpty()) {
		setStorage(sampleData);
	}
}

RetrospectiveStore.prototype = eventEmitter({
	getAll: getStorage
});

function storeIsEmpty() {
	return storage.getItem(KEY_STORAGE) === null; 
}

function clearStorage() {
	storage.removeItem(KEY_STORAGE);
	storage.setItem(KEY_STORAGE, JSON.stringify({}));
}

function setStorage(d) {
	storage.setItem(KEY_STORAGE, JSON.stringify(d));
}

function getStorage() {
	return JSON.parse(storage.getItem(KEY_STORAGE));
}

function doAction(payload) {
	switch (payload.eventName) {
		case 'reset-all':
			clearStorage();
			exports.emit('change');
		break;

		case 'sample-data':
			setStorage(sampleData);
			exports.emit('change');
		break;
	}

	return true;
}

exports = module.exports = new RetrospectiveStore();
