'use strict';

var React = require('react');
var K = require('../constants');

var Footer = React.createClass({

	// RENDER
	render: function render() {
		return <div className="footer">
			<button onClick={ this.printableMode } className="btn btn-bordered" type="button">Printable</button>&nbsp;
			<button onClick={ this.sortBadList } className="btn btn-bordered" type="button">Sort</button>
		</div>;
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
