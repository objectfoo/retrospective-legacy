'use strict';

var React = require('react');
var TextEntry = require('./TextEntry.jsx');
var Store = require('../store/RetrospectiveStore');

var List = React.createClass({
	handleChange: function() {
		this.forceUpdate();
		console.log('change event');
	},

	componentDidMount: function() {
		Store.on('change', this.handleChange);
	},

	componentWillUnmount: function() {
		Store.off('change', this.handleChange);
	},

	render: function() {
		var items = Store.getAll()[this.props.id] || [], html;

		html = items.map(function(item) {
			return <li key={item.id}>{item.text}</li>;
		});

		return (
			<ul id={this.props.id}>
				{html}
			</ul>
		);
	}
});

module.exports = List;
