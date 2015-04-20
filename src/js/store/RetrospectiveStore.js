'use strict';

var sampleData = require('../sampleData.json');
var AppDispatcher = require('../AppDispatcher');
var eventEmitter = require('event-emitter');

var KEY_STORAGE = require('../retrospectiveConstants').KEY_STORAGE;
var actionTypes = require('../retrospectiveConstants').actionTypes;

var storage;


function RetrospectiveStore() {
	storage = global.localStorage;
	AppDispatcher.register(doAction);

	if (storage.getItem(KEY_STORAGE) === null) {
		setStorage(sampleData);
	}
}


RetrospectiveStore.prototype = eventEmitter({
	getAll: getStorage
});


function doAction(payload) {
	console.log('RetrospectiveStore:doAction()', payload);

	switch (payload.actionType) {
		case actionTypes.clearAll:
			clearStorage();
			// exports.emit('change:all');
		break;

		case actionTypes.sampleData:
			setStorage(sampleData);
			// exports.emit('change:all');
		break;

		case actionTypes.editItem:
			setEditing(payload.list, payload.itemId)
			// exports.emit('change:all');
		break;
	}
	exports.emit('change:all');
	return true;
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


function setEditing(list, id) {
	var store = getStorage();

	store[list].forEach(function(item) {
		item.isEditing = item.id === id ? true : false;
		return item;
	});

	setStorage(store);
	return true;
}


exports = module.exports = new RetrospectiveStore();
