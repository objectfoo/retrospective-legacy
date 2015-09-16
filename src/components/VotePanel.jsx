'use strict';

var React = require('react');
var actions = require('../actions');
var isDigitCharCode = require('../lib/isDigitCharCode');

var VotePanel = React.createClass({
	render: function() {
		return (
			<div className="u-pull-left" style={{ margin: '0 8px' }}>
				<button type="button"
					onClick={this.onClick}
					className="btn-increment">+</button>
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

	onChange: function(event) {
		var value = parseInt(event.target.value, 10);

		actions.updateVote(this.props.id, this.props.listName, value);
	},

	onKeyPress: function(event) {
		if (!isDigitCharCode(event.which)) {
			event.preventDefault();
		}
	},

	onClick: function() {
		actions.updateVote(this.props.id, this.props.listName, this.props.tally + 1);
	}
});

module.exports = VotePanel;
