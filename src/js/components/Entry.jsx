'use strict';

var React = require('react');
var EntryInput = require('./EntryInput.jsx');
var EntryText = require('./EntryText.jsx');
var actionTypes = require('../constants').actionTypes;

var Entry = React.createClass({
	render: function() {
		var content,
			item = this.props.item,
			onDblClick = this.setEditable.bind(this, item.id);

		if (item.isEditing) {
			content = <EntryInput {...this.props} />;
		}
		else {
			content = <EntryText text={item.text} {...this.props} />;
		}

		return <li onDoubleClick={onDblClick}>{content}</li>;
	},

	// ACTIONS
	setEditable: function(itemId) {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.editItem,
			list: this.props.list,
			itemId: itemId
		});
	}
});

module.exports = Entry;
