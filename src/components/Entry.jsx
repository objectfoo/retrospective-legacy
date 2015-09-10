'use strict';

var React = require('react');
var EntryEdit = require('./EntryEdit.jsx');
var actionTypes = require('../constants').actionTypes;
var RETURN_KEY = 13;
var ESCAPE_KEY = 27;

var Entry = React.createClass({

	render: function() {
		var isEditing = this.props.item.isEditing
			, button = null
			, content = null
			, vote = null
			;

		if (!isEditing && this.props.votingEnabled) {
			vote = (
				<div className="u-pull-left" style={{ margin: '0 8px' }}>
					<button onClick={this.handleIncrement} className="btn-increment" type="button">+</button>
					<input
						className="entry-vote"
						type="text"
						value={this.props.item.tally}
						onChange={this.handleChange}
						onBlur={this.handleBlur}
						onKeyDown={this.handleKeyDown}
						/>
				</div>
			);
		}

		if (!isEditing) {
			content = <div className="entry-content" onDoubleClick={this.handleDoubleClick}>{this.props.item.text}</div>;
			button = <button className="btn-close" type="button" onClick={this.handleDelete}>{String.fromCharCode(10006)}</button>;
		}
		else {
			content = <EntryEdit {...this.props}/>;
		}

		return <li>{vote}{content}{button}</li>;
	},

	// ACTIONS
	handleIncrement: function() {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.incrementTally,
			list: this.props.list,
			itemId: this.props.item.id
		});
	},

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
	},

	handleChange: function(event) {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.
		});
		this.setState({ tally: event.target.value });
	},

	handleBlur: function() {
		window.console.log('update state');
	},

	handleKeyDown: function(event) {
		switch (true) {
			case event.which === RETURN_KEY:
				window.console.log('return key: save value to store');
				break;
			case event.which === ESCAPE_KEY:
				window.console.log('esc key: set value back to original value');
				break;
			case !isDigitCharCode(event.which):
				event.preventDefault();
				break;
		}
	}
});

module.exports = Entry;

function isDigitCharCode(x) {
	return x >= 48 && x <= 57;
}
