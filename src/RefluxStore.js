'use strict';

var Reflux = require('reflux');
var RetrospectiveActions = require('./actions');
var localStore = require('./lib/localStore');
var sampleData = require('./sampledata.json');
var uuid = require('./lib/uuid');
var first = require('./lib/first');
var defaultData = { good: [], bad: [], next: [] };

var RefluxStore = Reflux.createStore({
	listenables: RetrospectiveActions,

	init: function() {
		var data = localStore();

		if (data !== null) {
			this.data = data;
		}
		else {
			localStore(defaultData);
			this.data = localStore();
		}

	},

	changed: function() {
		localStore(this.data);
		this.trigger(this.data);
	},

	getInitialState: function() {
		return this.data;
	},

	onSampleData: function() {
		this.data = sampleData;
		this.changed();
	},

	onClearAll: function() {
		this.data = defaultData;
		this.changed();
	},

	onAddItem: function(listName, data) {
		this.data[listName].unshift({
			tally: 0,
			text: data,
			id: uuid()
		});
		this.changed();
	},

	onDeleteItem: function(id, listName) {
		var list = this.data[listName]
			, recordToDelete = findRecord(this.data[listName])
			, idx = list.indexOf(first(recordToDelete));

		if (idx >= 0) {
			list.splice(idx, 1);
			this.changed();
		}
	},

	onUpdateText: function(id, listName, text) {
		var record = findRecord(id, this.data[listName]);

		record.text = text;
		this.changed();
	},

	onUpdateVote: function(id, listName, value) {
		var record = findRecord(id, this.data[listName]);

		record.tally = value;
		this.changed();
	}
});

module.exports = RefluxStore;

function findRecord(id, list) {
	var items = list.filter(function(o) {
		return o.id === id;
	});

	return first(items);
}
