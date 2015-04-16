'use strict';

var AppDispatcher = require('../AppDispatcher');
var eventEmitter = require('event-emitter');
var KEY_STORAGE = 'retrospective-react';
var storage;

function RetrospectiveStore() {
	storage = global.localStorage;
	AppDispatcher.register(doAction);

	if (storeIsEmpty()) {
		setStorage(sampleData());
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
			setStorage(sampleData());
			exports.emit('change');
		break;
	}

	return true;
}

function sampleData() {
	return {
		good: [
			{id: 1, text: 'one'},
			{id: 2, text: 'two'},
			{id: 3, text: 'three'}
		],
		bad: [
			{id: 10, text: 'four'},
			{id: 20, text: 'five'},
			{id: 30, text: 'six'}
		],
		next: [
			{id: 100, text: 'seven'},
			{id: 200, text: 'eight'},
			{id: 300, text: 'nine'}
		]
	};
}

exports = module.exports = new RetrospectiveStore();
