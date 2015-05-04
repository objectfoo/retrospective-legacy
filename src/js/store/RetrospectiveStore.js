'use strict';

var sampleData = require('../sampleData.json');
var AppDispatcher = require('../AppDispatcher');
var eventEmitter = require('event-emitter');

var KEY_STORAGE = require('../constants').KEY_STORAGE;
var actionTypes = require('../constants').actionTypes;

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
			exports.emit('change:all');
		break;

		case actionTypes.sampleData:
			setStorage(sampleData);
			exports.emit('change:all');
		break;

		case actionTypes.editItem:
			toggleEditing(payload.list, payload.itemId);
			exports.emit('change:all');
		break;

		case actionTypes.updateItem:
			updateItem(payload.list, payload.itemId, payload.value);
			exports.emit('change:' + payload.list);
		break;
	}

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


function toggleEditing(list, id) {
	var store = getStorage();

	store[list].forEach(function(item) {
		item.isEditing = item.id === id ? !item.isEditing : false;

		return item;
	});

	setStorage(store);
	return true;
}


function updateItem(list, id, value) {
	var store = getStorage()
		, data = store[list]
		;

	for (var i = data.length - 1; i >= 0; i--) {

		if (data[i].id === id) {
			data[i].text = value;
			data[i].isEditing = false;
			break;
		}
	}

	setStorage(store);
	return true;
}













exports = module.exports = new RetrospectiveStore();
