'use strict';

var React = require('react');
var actionTypes = require('../constants').actionTypes;
var RETURN_KEY = 13;
var ESCAPE_KEY = 27;

var EntryForm = React.createClass({

	render: function() {
		return(
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					ref="EntryText"
					value={this.state.text}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					onKeyDown={this.handleKeyDown}
					/>
					<button type="submit">Save</button>
					<button type="button" onClick={this.handleCancel}>Cancel</button>
			</form>
		);
	},

	getInitialState: function() {
		return { text: this.props.item.text };
	},

	componentDidMount: function() {
		this.refs.EntryText.getDOMNode().select();
	},

	handleSubmit: function() {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.updateItem,
			list: this.props.list,
			itemId: this.props.item.id,
			value: this.state.text.trim()
		});
	},

	handleCancel: function() {
		this.toggleEditing();
	},

	handleBlur: function(event) {
		this.setState({ text: event.target.value.trim() });
		this.toggleEditing();
	},

	handleChange: function(event) {
		this.setState({ text: event.target.value });
	},

	handleKeyDown: function(event) {
		if (event.which === RETURN_KEY) {
			this.setState({ text: this.refs.EntryText.getDOMNode().value.trim() });
			this.handleSubmit();
		} else if (event.which === ESCAPE_KEY) {
			this.toggleEditing();
		}

	},

	toggleEditing: function() {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.editItem,
			list: this.props.list,
			itemId: this.props.item.id

		});
	}
});

module.exports = EntryForm;

/*
content = <input
	ref="EntryText"
	type="text"
	value={text}
	onChange={this.handleChange}
	onBlur={this.handleBlur}
	onKeyDown={this.handleKeyDown} />;

	button = <button onClick={this.handleSubmit} type="button">Save</button>;


 */
