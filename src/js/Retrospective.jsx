'use strict';

var React = require('react');
var Header = require('./Header.jsx');
var List = require('./List.jsx');

var Retrospective = React.createClass({
	render: function() {
		return(
			<div className="retrospective">
				<Header />
				<List id="good" />
				<List id="bad" />
				<List id="next" />
			</div>
		);
	}
});

// list
// list with voting
// sort button, print button
// list

module.exports = Retrospective;
