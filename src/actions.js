var Reflux = require('reflux');

var RetrospectiveActions = Reflux.createActions([
	'clearAll',
	'sampleData',
	'addItem',
	'deleteItem',
	'updateText'
]);

module.exports = RetrospectiveActions;
