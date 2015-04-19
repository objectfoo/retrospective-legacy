'use strict';

var Dispatcher = require('../AppDispatcher');
var actionTypes = require('../retrospectiveConstants').actionTypes;

module.exports = {
	updateList: updateList
};

function updateList(id) {
	Dispatcher.dispatch({
		actionType: actionTypes.updateList,
		id: id
	});
}
