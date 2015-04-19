'use strict';

var Dispatcher = require('../AppDispatcher');
var actionTypes = require('../retrospectiveConstants').actionTypes;

module.exports = {
	clearAll: clearAll,
	sampleData: sampleData
};

function clearAll() {
	Dispatcher.dispatch({ actionType: actionTypes.clearAll });
}

function sampleData() {
	Dispatcher.dispatch({ actionType: actionTypes.sampleData });
}