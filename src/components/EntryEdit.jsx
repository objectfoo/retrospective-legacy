'use strict';

var React = require('react');
var actionTypes = require('../constants').actionTypes;
var dispatcher = require('../dispatcher');

var RETURN_KEY = 13;
var ESCAPE_KEY = 27;

var EntryForm = React.createClass({
	getInitialState: function() {
		return { text: this.props.item.text };
	},

	componentDidMount: function() {
		var n = React.findDOMNode(this.refs.EntryText);
		n.focus();
		n.selectionStart = n.selectionEnd = n.value.length;
	},

	render: function() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input
					className="entry-field entry-field-fancy"
					type="text"
					ref="EntryText"
					value={this.state.text}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					onKeyDown={this.handleKeyDown}
					/>
			</form>
		);
	},

	handleSubmit: function() {
		dispatcher.dispatch({
			actionType: actionTypes.updateItem,
			list: this.props.list,
			itemId: this.props.item.id,
			value: this.state.text.trim()
		});
	},

	handleBlur: function(event) {
		this.setState({ text: event.target.value.trim() });
		this.props.toggleEditing();
	},

	handleChange: function(event) {
		this.setState({ text: event.target.value });
	},

	handleKeyDown: function(event) {
		if (event.which === RETURN_KEY) {
			this.setState({ text: this.refs.EntryText.getDOMNode().value.trim() });
			this.handleSubmit();
		} else if (event.which === ESCAPE_KEY) {
			this.props.toggleEditing();
		}
	}
});

module.exports = EntryForm;
