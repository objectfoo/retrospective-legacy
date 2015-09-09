'use strict';


var React = require('react');
var actionTypes = require('../constants').actionTypes;

var Header = React.createClass({

	// RENDER
	render: function() {
		return(
			<header className="u-micro-cf m-bottom">
				<div className="u-pull-right">
					<button onClick={ this.fillSampleData } className='btn btn-gradient'>Sample</button>
					&nbsp;
					<button onClick={ this.clearAll } className='btn btn-gradient'>Clear All</button>
				</div>
				<h1 className="pull-left page-title">Retrospective <small>ReactJS</small></h1>
				<div className='u-pull-right text-mute'><small>{ this.props.date }</small></div>
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
