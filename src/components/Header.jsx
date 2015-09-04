'use strict';


var React = require('react');
var actionTypes = require('../constants').actionTypes;

var Header = React.createClass({

	// RENDER
	render: function() {
		return(
			<header className="header">
				<h1 className='pull-left'>Retrospective <small>ReactJS version</small></h1>
				<button onClick={ this.fillSampleData } className='pull-right'>Sample</button>&nbsp;
				<button onClick={ this.clearAll } className='pull-right'>Clear All</button>
				<hr />
				<div className='pull-right'>{ this.props.date }</div>
			</header>
		);
	},

	// LIFECYCLE
	getDefaultProps: function() {
		var d = (new Date()).toJSON(), dParts;

		d = d.replace(/T.*/, '');
		dParts = d.split('-');
		dParts = [dParts[1], dParts[2], dParts[0]];

		return { date: dParts.join('/') };
	},

	// ACTIONS
	fillSampleData: function() {
		this.props.dispatcher.dispatch({ actionType: actionTypes.sampleData });
	},

	clearAll: function() {
		this.props.dispatcher.dispatch({ actionType: actionTypes.clearAll });
	}

});

module.exports = Header;
