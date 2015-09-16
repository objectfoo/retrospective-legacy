'use strict';

var React = require('react');
var actions = require('../actions');

var Footer = React.createClass({
	render: function render() {
		return(
			<footer className="u-micro-cf">
				<div className="lower-controls m-bottom">
					<button onClick={ this.printable } className="btn btn-bordered btn-gradient" type="button">Printable</button>
					<button onClick={ this.sortBadList } className="btn btn-bordered btn-gradient" type="button">Sort</button>
				</div>
				<small className="u-pull-right text-mute">a Katabelisk production, Retrospective v7.0 (reactjs)</small>
			</footer>
		);
	},

	// ACTIONS
	sortBadList: function() {
		actions.sortBadList();
	},

	printable: function() {
		this.props.setPrintable();
	}
});

module.exports = Footer;
