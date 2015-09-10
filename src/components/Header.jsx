'use strict';


var React = require('react');
var actionTypes = require('../constants').actionTypes;
var dispatcher = require('../dispatcher');

var Header = React.createClass({
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

	// ACTIONS
	fillSampleData: function() {
		dispatcher.dispatch({ actionType: actionTypes.sampleData });
	},

	clearAll: function() {
		dispatcher.dispatch({ actionType: actionTypes.clearAll });
	}

});

module.exports = Header;
