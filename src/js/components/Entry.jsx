'use strict';

var React = require('react');
var actionTypes = require('../constants').actionTypes;
var RETURN_KEY = 13;

var Entry = React.createClass({
	getInitialState: function() {
		return { text: this.props.item.text };
	},

	render: function() {
		var content
			, isEditing = this.props.item.isEditing
			, text = this.state.text
			;

		if (!isEditing) {
			content = text;
		}
		else {
			content = <div>
				<input ref="EntryText" type="text" value={text}
					onChange={this.handleChange} onBlur={this.handleBlur}
					onKeyPress={this.handleKeypress} />
				<button onClick={this.handleSubmit} type="button">Save</button>
			</div>;
		}

		return <li onDoubleClick={this.handleDoubleClick}>{content}</li>;
	},

	// ACTIONS
	handleChange: function(evt) {
		this.setState({ text: evt.target.value });
	},

	handleBlur: function(evt) {
		this.setState({ text: evt.target.value.trim() });
	},

	handleKeypress: function(evt) {
		if (evt.which === RETURN_KEY) {
			this.setState({ text: this.refs.EntryText.getDOMNode().value.trim() });
			this.handleSubmit();
			evt.preventDefault();
		}
	},

	handleSubmit: function() {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.updateItem,
			list: this.props.list,
			itemId: this.props.item.id,
			value: this.refs.EntryText.getDOMNode().value
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