'use strict';

var React = require('react');
var K = require('../constants');

var Footer = React.createClass({

	// RENDER
	render: function render() {
		return(
			<footer className="u-micro-cf">
				<div className="lower-controls m-bottom">
					<button onClick={ this.printableMode } className="btn btn-bordered" type="button">Printable</button>&nbsp;
					<button onClick={ this.sortBadList } className="btn btn-bordered" type="button">Sort</button>
				</div>
				<small className="u-pull-right text-mute">a Katabelisk production, Retrospective v6.0 (reactjs)</small>
			</footer>
		);
	},

	// ACTIONS
	sortBadList: function() {
		this.props.dispatcher.dispatch({
			actionType: K.actionTypes.sortBadList
		});
	},

	printableMode: function() {
		window.console.log('printable mode');
	}
});

module.exports = Footer;
