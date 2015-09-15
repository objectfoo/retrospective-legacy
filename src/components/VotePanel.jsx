'use strict';

var React = require('react');
var actions = require('../actions');
var isDigitCharCode = require('../lib/isDigitCharCode');

var VotePanel = React.createClass({
	render: function() {
		return (
			<div className="u-pull-left" style={{ margin: '0 8px' }}>
				<button
					onClick={this.onClick} className="btn-increment" type="button">+</button>
				<input
					className="entry-vote"
					type="text"
					value={this.props.tally}
					onChange={this.onChange}
					onKeyPress={this.onKeyPress}
				/>
			</div>
		);
	},

	onChange: function() {
		actions.updateVote();
	},

	onKeyPress: function(event) {
		if (!isDigitCharCode(event.which)) {
			event.preventDefault();
		}
	},

	onClick: function() {
		actions.updateVote();
	}
});

module.exports = VotePanel;


/*
	handleIncrement: function() {
		// dispatcher.dispatch({
		// 	actionType: actionTypes.incrementTally,
		// 	list: this.props.list,
		// 	itemId: this.props.item.id
		// });
	},

	handleChange: function() {
		// var value = parseInt(event.target.value, 10);
		//
		// dispatcher.dispatch({
		// 	actionType: actionTypes.setTally,
		// 	list: this.props.list,
		// 	itemId: this.props.item.id,
		// 	value: value
		// });
	},

	handleKeyPress: function() {
		// if (!isDigitCharCode(event.which)) {
		// 	event.preventDefault();
		// }
	}
 */
