'use strict';

var React = require('react');

var EntryInput = React.createClass({
	render: function() {
		return <div>
			<input type="text" /> <button type="button">Save</button>
		</div>;
	}
});

module.exports = EntryInput;