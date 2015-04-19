'use strict';

var Dispatcher = require('../AppDispatcher');
var actionNames = require('../constants').actions;

module.exports = {
	clearAll: clearAll,
	sampleData: sampleData
};

function clearAll() {
	Dispatcher.dispatch({ eventName: actionNames.clearAll });
}

function sampleData() {
	Dispatcher.dispatch({ eventName: actionNames.sampleData });
}