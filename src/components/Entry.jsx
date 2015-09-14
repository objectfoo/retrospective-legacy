'use strict';

var React = require('react');
var isDigitCharCode = require('../lib/isDigitCharCode');

var EntryEdit = require('./EntryEdit.jsx');

var Entry = React.createClass({
	render: function() {
		var isEditing = this.state.isEditing
			, button = null
			, content = null
			, vote = null
			;

		// if (!isEditing && this.props.votingEnabled) {
		// 	vote = (
		// 		<div className="u-pull-left" style={{ margin: '0 8px' }}>
		// 			<button onClick={this.handleIncrement} className="btn-increment" type="button">+</button>
		// 			<input
		// 				className="entry-vote"
		// 				type="text"
		// 				value={this.props.item.tally}
		// 				onChange={this.handleChange}
		// 				onKeyPress={this.handleKeyPress} />
		// 		</div>
		// 	);
		// }

		if (!isEditing) {
			content = <div className="entry-content" onDoubleClick={this.toggleEditing}>{this.props.item.text}</div>;
			button = <button tabIndex="-1" className="btn-close" type="button" onClick={this.props.deleteItem}>{String.fromCharCode(10006)}</button>;
		}
		else {
			content = <EntryEdit {...this.props} toggleEditing={this.toggleEditing} />;
		}

		return <li>{vote}{content}{button}</li>;
	},

	getInitialState: function() {
		return { isEditing: false };
	},

	toggleEditing: function() {
		this.setState({ isEditing: !this.state.isEditing });
	},

	// ACTIONS
	// handleIncrement: function() {
	// 	dispatcher.dispatch({
	// 		actionType: actionTypes.incrementTally,
	// 		list: this.props.list,
	// 		itemId: this.props.item.id
	// 	});
	// },

	// handleChange: function(event) {
	// 	var value = parseInt(event.target.value, 10);
	//
	// 	dispatcher.dispatch({
	// 		actionType: actionTypes.setTally,
	// 		list: this.props.list,
	// 		itemId: this.props.item.id,
	// 		value: value
	// 	});
	// },

	// handleKeyPress: function(event) {
	// 	if (!isDigitCharCode(event.which)) {
	// 		event.preventDefault();
	// 	}
	// }
});

module.exports = Entry;
