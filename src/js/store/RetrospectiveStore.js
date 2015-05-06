'use strict';

var K = require('../constants');
var eventEmitter = require('event-emitter');
var uuid = require('./utils').uuid;
var sampleData = require('../sampleData.json');

module.exports = function(dispatcher) {
	var ee = eventEmitter({
		getAll: getStorage
	});

	if (getStorage() === null) {
		clearStorage();
	}

	dispatcher.register(function(payload) {
		var message = doAction(payload);

		if (message) {
			ee.emit(message);
		}

		return true;
	});

	return ee;
};


function doAction(payload) {
	var message = null;
	
	switch (payload.actionType) {
		case K.actionTypes.clearAll:
			clearStorage();
			message = 'change:all';
		break;

		case K.actionTypes.sampleData:
			setStorage(sampleData);
			message = 'change:all';
		break;

		case K.actionTypes.editItem:
			toggleEditing(payload.list, payload.itemId);
			message = 'change:all';
		break;

		case K.actionTypes.updateItem:
			updateItem(payload.list, payload.itemId, payload.value);
			message = 'change:' + payload.list;
		break;

		case K.actionTypes.addItem:
			addItem(payload.list, payload.value);
			message = 'change:' + payload.list;
		break;

		case K.actionTypes.removeItem:
			removeItem(payload.list, payload.itemId);
			message = 'change:' + payload.list;
		break;
	}
	return message;
}


/**
 * Actions
 */
function toggleEditing(listName, id) {
	modifyStore(listName, function(list) {
		list.map(setEditing(id));
	});
}


function updateItem(listName, id, value) {
	modifyStore(listName, function(list) {
		list.filter(eqId(id)).map(setText(value));
	});
}


function addItem(listName, value) {
	modifyStore(listName, function(list) {
		var newItem = {
			id: uuid(),
			text: value,
			isEditing: false
		};

		list.unshift(newItem);
	});
}

function removeItem(listName, id) {
	modifyStore(listName, function(list) {
		var el = list.reduce(function(prev, curr) {
			return curr.id === id ? curr : prev;
		}, null)
		,  idx = list.indexOf(el);

		if (idx >= 0) {
			list.splice(idx, 1);
		}
	});
}

function modifyStore(listName, fn) {
	var store = getStorage();
	fn(store[listName]);
	setStorage(store);
}


/**
 * Storage
 */
function clearStorage() {
	global.localStorage.removeItem(K.STORE_KEY);
	setStorage({ good: [], bad: [], next: [] });
}


function setStorage(d) {
	global.localStorage.setItem(K.STORE_KEY, JSON.stringify(d));
}


function getStorage() {
	return JSON.parse(global.localStorage.getItem(K.STORE_KEY));
}


/**
 * helpers
 */
function setEditing(id) {
	return function(item) {
		item.isEditing = item.id === id ? !item.isEditing : false;
		return item;
	};
}


function setText(value) {
	return function(item) {
		item.text = value;
		item.isEditing = false;
		return item;
	};
}


function eqId(id) {
	return function(item) {
		return item.id === id;
	};
}

