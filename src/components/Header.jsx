'use strict';

var React = require('react');
var actions = require('../actions');

var Header = React.createClass({
	render: function() {
		return(
			<header className="u-micro-cf m-bottom">
				<div className="u-pull-right">
					<button onClick={ actions.sampleData } className='btn btn-gradient'>Sample</button>
					<button onClick={ actions.clearAll } className='btn btn-gradient'>Clear All</button>
				</div>
				<h1 className="pull-left page-title">Retrospective <small>ReactJS w/RefluxJS</small></h1>
				<div className='u-pull-right text-mute'><small>{ this.props.date }</small></div>
			</header>
		);
	}
});

module.exports = Header;
