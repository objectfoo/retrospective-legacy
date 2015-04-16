'use strict';

var React = require('react');
var TextEntry = require('./TextEntry.jsx');

var List = React.createClass({
	getDefaultProps: function () {
		return {items: [
			{id: 1, text: 'one'},
			{id: 2, text: 'two'},
			{id: 3, text: 'three'},
		]};
	},

	render: function() {
		var items = this.props.items;


		var html = items.map(function(item) {
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
