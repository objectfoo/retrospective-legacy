'use strict';

var React = require('react');

var Header = React.createClass({
	getDefaultProps: function() {
		var d = (new Date()).toJSON();

		d = d.replace(/T.*/, '');

		return {date: d};
	},

	render: function() {
		return(
			<header>
				<h1 className="pull-left">Retrospective <small>ReactJS version</small></h1>
				<button className="pull-right">Clear All</button>
				<hr />
				<div className="pull-right">{this.props.date}</div>
			</header>
		);
	}
});

module.exports = Header;
