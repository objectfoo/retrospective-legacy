'use strict';

var React = require('react');
var actions = require('./headerActions');

var Header = React.createClass({
	sampleData: actions.sampleData,
	clearAll: actions.clearAll,

	getDefaultProps: function() {
		var d = (new Date()).toJSON(), dParts;

		d = d.replace(/T.*/, '');
		dParts = d.split('-');
		dParts = [dParts[1], dParts[2], dParts[0]];

		return { date: dParts.join('/') };
	},

	render: function() {
		return(
			<header>
				<h1 className='pull-left'>Retrospective <small>ReactJS version</small></h1>
				<button onClick={ this.sampleData } className='pull-right'>Sample</button>&nbsp;
				<button onClick={ this.clearAll } className='pull-right'>Clear All</button>
				<hr />
				<div className='pull-right'>{ this.props.date }</div>
			</header>
		);
	}
});

module.exports = Header;
