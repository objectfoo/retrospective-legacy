'use strict';

var React = require('react');
var actionTypes = require('../retrospectiveConstants').actionTypes;

var Entries = React.createClass({

	render: function() {
		var items = this.props.store.getAll()[this.props.list] || [], html;

		html = items.map(function(item) {
			var editing = item.isEditing ? 'editing ' : '';

			return <li onClick={ this.setEditable.bind(this, item.id) } key={item.id}>
				{editing}{item.text}
			</li>;
		}, this);

		return (
			<ul id={this.props.list}>
				{html}
			</ul>
		);
	},

	handleChange: function() {
		this.forceUpdate();
	},

	// LIFECYCLE
	componentDidMount: function() {
		this.props.store.on('change:all', this.handleChange);
		this.props.store.on('change:' + this.props.list, this.handleChange);
	},

	componentWillUnmount: function() {
		this.props.store.off('change:all', this.handleChange);
		this.props.store.off('change:' + this.props.list, this.handleChange);
	},


	// ACTIONS
	setEditable: function (itemId) {
		var dispatcher = this.props.dispatcher;

		dispatcher.dispatch({
			actionType: actionTypes.editItem,
			list: this.props.list,
			itemId: itemId
		});
	}
});

module.exports = Entries;
