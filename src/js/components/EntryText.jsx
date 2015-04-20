'use strict';

var React = require('react');

var EntryText = React.createClass({
	render: function() {
		return <div>{this.props.text}</div>;
	}
});

module.exports = EntryText;