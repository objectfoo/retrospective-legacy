'use strict';

var React = require('react');
var store = require('../store/RetrospectiveStore');
var dispatcher = require('../AppDispatcher');

var Header = require('./Header.jsx');
var Entries = require('./Entries.jsx');
var Footer = require('./Footer.jsx');

var Retrospective = React.createClass({
	render: function() {
		return <div className='retrospective'>
			<Header dispatcher={dispatcher} />
			<Entries list='good' store={store} dispatcher={dispatcher} />
			<Entries list='bad' store={store} dispatcher={dispatcher} />
			<Entries list='next' store={store} dispatcher={dispatcher} />
			<Footer dispatcher={dispatcher} />
		</div>;
	}
});

module.exports = Retrospective;
