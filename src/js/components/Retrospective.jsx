'use strict';

var React = require('react');
var store = require('../store/RetrospectiveStore');
var dispatcher = require('../AppDispatcher');

var Header = require('./Header.jsx');
var List = require('./List.jsx');
var Footer = require('./Footer.jsx');

var Retrospective = React.createClass({
	render: function() {
		return <div className='retrospective'>
			<Header dispatcher={dispatcher} />
			<List list='good' store={store} dispatcher={dispatcher} />
			<List list='bad' store={store} dispatcher={dispatcher} />
			<List list='next' store={store} dispatcher={dispatcher} />
			<Footer dispatcher={dispatcher} />
		</div>;
	}
});

module.exports = Retrospective;
