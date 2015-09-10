'use strict';

var K = require('../constants');
var eventEmitter = require('event-emitter');
var uuid = require('./utils').uuid;
var sampleData = require('../sampleData.json');
var storage = require('./utils').storage;

module.exports = function(dispatcher) {
	var ee = eventEmitter({
		getAll: storage
	});

	if (storage() === null) {
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
			storage(sampleData);
			message = 'change:all';
			break;
		case K.actionTypes.editItem:
			toggleEditing(payload.list, payload.itemId);
			message = 'change:' + payload.list;
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
		case K.actionTypes.sortBadList:
			sortBadList(payload.list);
			message = 'change:' + payload.list;
			break;
		case K.actionTypes.incrementTally:
			incrementTally(payload.list, payload.itemId);
			message = 'change:' + payload.list;
			break;
		case K.actionTypes.setTally:
			setTally(payload.list, payload.itemId, payload.value);
			message = 'change:' + payload.list;
			break;
	}

	return message;
}


/**
 * Actions
 */
function setTally(listName, id, value) {
	modifyStore(listName, function(list) {
		var item = entryById(list, id);

		if (item) {
			item.tally = value;
		}
	});
}

function incrementTally(listName, id) {
	modifyStore(listName, function(list) {
		var item = entryById(list, id);

		if (item) {
			item.tally += 1;
		}
	});
}

function sortBadList(listName) {
	modifyStore(listName, function(list) {
		list.sort(cmpVote);
	});
}

function cmpVote(a, b) {
	return a.tally - b.tally;
}

function toggleEditing(listName, id) {
	modifyStore(listName, function(list) {
		list.map(setEditing(id));
	});
}


function updateItem(listName, id, value) {
	modifyStore(listName, function(list) {
		var item = entryById(list, id);

		if (item) {
			item.text = value;
			item.isEditing = false;
		}
	});
}


function addItem(listName, value) {
	modifyStore(listName, function(list) {
		var newItem = {
			id: uuid(),
			text: value,
			isEditing: false,
			tally: 0
		};

		list.unshift(newItem);
	});
}

function removeItem(listName, id) {
	modifyStore(listName, function(list) {
		var item = entryById(list, id);
		var idx = list.indexOf(item);

		if (idx >= 0) {
			list.splice(idx, 1);
		}
	});
}

function modifyStore(listName, fn) {
	var store = storage();

	fn(store[listName]);
	storage(store);
}


/**
 * Storage
 */
function clearStorage() {
	storage(null);
	storage({ good: [], bad: [], next: [] });
}


/**
 * helpers
 */
function entryById(list, id) {
	return first(list.filter(eqId(id)));
}

function setEditing(id) {
	return function(item) {
		item.isEditing = item.id === id ? !item.isEditing : false;
		return item;
	};
}

function eqId(id) {
	return function(item) {
		return item.id === id;
	};
}

function first(a) {
	if (Array.isArray(a)) {
		return a[0];
	}

	return null;
}
