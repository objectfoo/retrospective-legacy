'use strict';

var React = require('react');

var Footer = React.createClass({

	// RENDER
	render: function render() {
		return <div className="footer">
			<button onClick={ this.printableMode } type="button">Printable</button>&nbsp;
			<button onClick={ this.sortBadList } type="button">Sort</button>
		</div>;
	},

	// ACTIONS
	sortBadList: function() {
		console.log('sort bad list');
	},

	printableMode: function() {
		console.log('printable mode');
	}
});

module.exports = Footer;
