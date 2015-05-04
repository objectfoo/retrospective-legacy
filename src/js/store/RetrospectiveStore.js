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

		case actionTypes.addItem:
			addItem(payload.list, payload.value);
			exports.emit('change:' + payload.list);
		break;

	}

	return true;
}


function clearStorage() {
	storage.removeItem(KEY_STORAGE);
	storage.setItem(KEY_STORAGE, JSON.stringify({
		good: [],
		bad: [],
		next: []
	}));
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


function addItem(list, value) {
	var store = getStorage()
		;
	console.log(list, value);
	store[list].unshift({
		id: newUuid(),
		text: value,
		isEditing: false
	});

	setStorage(store);
}


function newUuid() {
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






exports = module.exports = new RetrospectiveStore();
