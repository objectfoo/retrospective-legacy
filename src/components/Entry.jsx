'use strict';

var React = require('react');
var actionTypes = require('../constants').actionTypes;
var RETURN_KEY = 13;
var ESCAPE_KEY = 27;

var Entry = React.createClass({

	render: function() {
		var content
			, isEditing = this.props.item.isEditing
			, text = this.state.text
			;

		if (!isEditing) {
			content = <div>
				{text}
				<button type="button"
					onClick={this.handleDelete}>delete</button>
			</div>;
		}
		else {
			content = <div>
				<input ref="EntryText" type="text"
					value={text}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					onKeyDown={this.handleKeyDown} />
				<button onClick={this.handleSubmit} type="button">Save</button>
			</div>;
		}

		return <li onDoubleClick={this.handleDoubleClick}>{content}</li>;
	},

	getInitialState: function() {
		return { text: this.props.item.text };
	},

	componentDidUpdate: function(nextProps) {
		var newProps = this.props;

		if (newProps.item.isEditing === true
				&& nextProps.item.isEditing === false) {
			this.refs.EntryText.getDOMNode().select();
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return this.state.text !== nextState.text
				|| this.props.item.isEditing !== nextProps.item.isEditing;
	},

	// ACTIONS
	handleDelete: function(evt) {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.removeItem,
			list: this.props.list,
			itemId: this.props.item.id
		});
	},
	handleChange: function(evt) {
		this.setState({ text: evt.target.value });
	},

	handleBlur: function(evt) {
		this.setState({ text: evt.target.value.trim() });
	},

	handleKeyDown: function(evt) {
		if (evt.which === RETURN_KEY) {
			this.setState({ text: this.refs.EntryText.getDOMNode().value.trim() });
			this.handleSubmit();
		} else if (evt.which === ESCAPE_KEY) {
			this.props.dispatcher.dispatch({
				actionType: actionTypes.editItem,
				list: this.props.list,
				itemId: this.props.item.id
			});
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
