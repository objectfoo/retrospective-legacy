'use strict';

var React = require('react');
var EntryEdit = require('./EntryEdit.jsx');
var actionTypes = require('../constants').actionTypes;

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
						onKeyDown={this.handleKeyDown}
						/>
				</div>
			);
		}

		if (!isEditing) {
			content = <div className="entry-content" onDoubleClick={this.toggleEditing}>{this.props.item.text}</div>;
			button = <button tabIndex="-1" className="btn-close" type="button" onClick={this.handleDelete}>{String.fromCharCode(10006)}</button>;
		}
		else {
			content = <EntryEdit {...this.props} toggleEditing={this.toggleEditing}/>;
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

	toggleEditing: function() {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.editItem,
			list: this.props.list,
			itemId: this.props.item.id
		});
	},

	handleChange: function(event) {
		var value = parseInt(event.target.value, 10);

		this.props.dispatcher.dispatch({
			actionType: actionTypes.setTally,
			list: this.props.list,
			itemId: this.props.item.id,
			value: value
		});
	},

	handleKeyDown: function(event) {
		if (!isDigitCharCode(event.which)) {
			event.prevendDefault();
		}
	}
});

module.exports = Entry;

function isDigitCharCode(x) {
	return x >= 48 && x <= 57;
}
