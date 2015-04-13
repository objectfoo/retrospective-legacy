'use strict';

var React = require('react');
var Header = require('./Header.jsx');

var HeaderContainer = React.createClass({
	getInitialState: function () {
		var d = (new Date()).toJSON();
		d = d.replace(/T.*/, '');
		return { date: d };
	},

	render: function() {
		return(
			<Header date={this.state.date} />
		);
	}	
});

module.exports = HeaderContainer;
