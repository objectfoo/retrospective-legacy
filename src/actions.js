var Reflux = require('reflux');

var RetrospectiveActions = Reflux.createActions([
	'clearAll',
	'sampleData',
	'addItem'
]);

module.exports = RetrospectiveActions;
