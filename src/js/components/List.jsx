'use strict';

var React = require('react');
var Store = require('../store/RetrospectiveStore');
var AppDispatcher = require('../AppDispatcher');
var actionNames = require('../constants').actions;
var listActions = require('./listActions');

var List = React.createClass({
	handleClick: function () {
		listActions.updateList(this.props.id);
	},

	handleChange: function() {
		this.forceUpdate();
	},

	componentDidMount: function() {
		Store.on('change:all', this.handleChange);
		Store.on('change:' + this.props.id, this.handleChange);
	},

	componentWillUnmount: function() {
		Store.off('change:all', this.handleChange);
		Store.off('change:' + this.props.id, this.handleChange);
	},

	render: function() {
		var items = Store.getAll()[this.props.id] || [], html;

		html = items.map(function(item) {
			return <li onClick={ this.handleClick } key={item.id}>{item.text}</li>;
		}, this);

		return (
			<ul id={this.props.id}>
				{html}
			</ul>
		);
	}
});

module.exports = List;
