'use strict';

var React = require('react');
var EntryEdit = require('./EntryEdit.jsx');
var actionTypes = require('../constants').actionTypes;

var Entry = React.createClass({

	render: function() {
		var isEditing = this.props.item.isEditing
			, button = null
			, content = null
			;

		if (!isEditing) {
			content = <div className="entry-content" onDoubleClick={this.handleDoubleClick}>{this.props.item.text}</div>;
			button = <button className="close" type="button" onClick={this.handleDelete}>{String.fromCharCode(10006)}</button>;
		}
		else {
			content = <EntryEdit {...this.props}/>;
		}

		return <li>{content}{button}</li>;
	},

	// ACTIONS
	handleDelete: function() {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.removeItem,
			list: this.props.list,
			itemId: this.props.item.id
		});
	},

	handleDoubleClick: function() {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.editItem,
			list: this.props.list,
			itemId: this.props.item.id
		});
	}
});

module.exports = Entry;
