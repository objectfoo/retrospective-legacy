'use strict';

var React = require('react');
var K = require('../constants');

var Footer = React.createClass({
	render: function render() {
		return(
			<footer className="u-micro-cf">
				<div className="lower-controls m-bottom">
					<button onClick={ this.printable } className="btn btn-bordered btn-gradient" type="button">Printable</button>&nbsp;
					<button onClick={ this.sortBadList } className="btn btn-bordered btn-gradient" type="button">Sort</button>
				</div>
				<small className="u-pull-right text-mute">a Katabelisk production, Retrospective v6.0 (reactjs)</small>
			</footer>
		);
	},

	// ACTIONS
	sortBadList: function() {
		this.props.dispatcher.dispatch({
			actionType: K.actionTypes.sortBadList,
			list: 'bad'
		});
	},

	printable: function() {
		this.props.setPrintable(true);
	}
});

module.exports = Footer;
