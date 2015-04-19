'use strict';

var Dispatcher = require('../AppDispatcher');
var actionNames = require('../constants').actions;

module.exports = {
	updateList: updateList
};

function updateList(id) {
	Dispatcher.dispatch({
		eventName: actionNames.updateList,
		id: id
	});
}
