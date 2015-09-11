'use strict';

var React = require('react');
var Entry = require('./Entry.jsx');
var actions = require('../actions');
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var Entries = React.createClass({

	render: function() {
		var cn = 'list-plain list-retrospective';

		return(
			<section className="phase">
				<input
					type="text"
					className="entry-field"
					value={this.state.value}
					placeholder={this.props.placeholder}
					onKeyDown={this.onKeyDown} />

				<ul id={this.props.list} className={cn}>
					{this.renderEntries()}
				</ul>
			</section>
		);
	},

	getInitialState: function() {
		return {text: ''};
	},

	onKeyDown: function(event) {
		if (event.which === ENTER_KEY && event.target.value.length > 0) {
			actions.addItem(event.target.value.trim(), this.props.list);
			event.target.value = '';
		} else if (event.which === ESCAPE_KEY) {
			event.target.value = this.state.text;
		}
	},

	renderEntries: function() {
		var whichList = this.props.list;

		return this.props.store[whichList].map(function(item) {
			return <Entry item={item} />;
		});
	}
});

module.exports = Entries;
