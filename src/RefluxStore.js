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

	getInitialState: function() {
		return this.data;
	},

	onSampleData: function() {
		localStore(sampleData);
		this.data = sampleData;
		this.trigger(this.data);
	},

	onClearAll: function() {
		localStore(defaultData);
		this.data = defaultData;
		this.trigger(this.data);
	},

	onAddItem: function(listName, data) {
		this.data[listName].unshift({
			tally: 0,
			text: data,
			id: uuid()
		});
		localStore(this.data);
		this.trigger(this.data);
	},

	onDeleteItem: function(id, listName) {
		var list = this.data[listName]
			, itemsToDelete
			, idx
			;

		itemsToDelete = list.filter(function(o) {
			return o.id === id;
		});

		idx = list.indexOf(first(itemsToDelete));

		if (idx >= 0) {
			list.splice(idx, 1);
			localStore(this.data);
			this.trigger(this.data);
		}
	},

	updateText: function(id, listName, text) {
		var item, items, list = this.data[listName];

		items = list.filter(function(o) {
			return o.id === id;
		});

		item = first(items);

		if (item) {
			item.text = text;
		}
		localStore(this.data);
		this.trigger(this.data);
	}

});

module.exports = RefluxStore;
