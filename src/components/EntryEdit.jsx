'use strict';

var React = require('react');
var actions = require('../actions');
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
			<form action="#" onSubmit={this.onSubmit}>
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

	onSubmit: function(event) {
		var n = React.findDOMNode(this.refs.EntryText);
		actions.updateText(this.props.item.id, this.props.listName, n.value.trim());
		this.props.toggleEditing();
		event.preventDefault();
	},

	handleBlur: function(event) {
		this.setState({ text: event.target.value.trim() });
		this.props.toggleEditing();
	},

	handleChange: function(event) {
		this.setState({ text: event.target.value });
	},

	handleKeyDown: function(event) {
		if (event.which === ESCAPE_KEY) {
			this.props.toggleEditing();
		}
	}
});

module.exports = EntryForm;
