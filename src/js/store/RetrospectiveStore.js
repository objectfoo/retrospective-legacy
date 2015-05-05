'use strict';

var sampleData = require('../sampleData.json');
var eventEmitter = require('event-emitter');

var STORE_KEY = require('../constants').STORE_KEY;
var actionTypes = require('../constants').actionTypes;

module.exports = function(dispatcher) {
	return new RetrospectiveStore(dispatcher);
};

function RetrospectiveStore(dispatcher) {
	dispatcher.register(doAction.bind(this));

	if (global.localStorage.getItem(STORE_KEY) === null) {
		setStorage(sampleData);
	}
}

RetrospectiveStore.prototype = eventEmitter({});
RetrospectiveStore.prototype.getAll = getStorage;

function doAction(payload) {
	console.log('RetrospectiveStore:doAction()', payload);

	switch (payload.actionType) {
		case actionTypes.clearAll:
			clearStorage();
			this.emit('change:all');
		break;

		case actionTypes.sampleData:
			setStorage(sampleData);
			this.emit('change:all');
		break;

		case actionTypes.editItem:
			toggleEditing(payload.list, payload.itemId);
			this.emit('change:all');
		break;

		case actionTypes.updateItem:
			updateItem(payload.list, payload.itemId, payload.value);
			this.emit('change:' + payload.list);
		break;

		case actionTypes.addItem:
			addItem(payload.list, payload.value);
			this.emit('change:' + payload.list);
		break;

	}

	return true;
}

function clearStorage() {
	global.localStorage.removeItem(STORE_KEY);
	global.localStorage.setItem(STORE_KEY, JSON.stringify({
		good: [],
		bad: [],
		next: []
	}));
}


function setStorage(d) {
	global.localStorage.setItem(STORE_KEY, JSON.stringify(d));
}


function getStorage() {
	return JSON.parse(global.localStorage.getItem(STORE_KEY));
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
