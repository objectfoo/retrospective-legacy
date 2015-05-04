'use strict';

var React = require('react')
, store = require('../store/RetrospectiveStore')
, dispatcher = require('../AppDispatcher')

, Header = require('./Header.jsx')
, Entries = require('./Entries.jsx')
, Footer = require('./Footer.jsx')

, Retrospective = React.createClass({
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
