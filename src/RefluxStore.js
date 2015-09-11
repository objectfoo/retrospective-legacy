'use strict';

var Reflux = require('reflux');
var RetrospectiveActions = require('./actions');
var localStore = require('./lib/localStore');
var sampleData = require('./sampledata.json');
var uuid = require('./lib/uuid');
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

	onAddItem: function(data, list) {
		this.data[list].unshift({
			tally: 0,
			text: data,
			id: uuid()
		});
		localStore(this.data);
		this.trigger(this.data);
	}

});

module.exports = RefluxStore;
