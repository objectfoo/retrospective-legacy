'use strict';

var React = require('react')
, Dispatcher = require('flux').Dispatcher
, dispatcher = new Dispatcher()
, store = require('../store/RetrospectiveStore')(dispatcher)

, Header = require('./Header.jsx')
, Entries = require('./Entries.jsx')
, Footer = require('./Footer.jsx')

, Retrospective = React.createClass({
	render: function() {
		var props = { store: store, dispatcher: dispatcher };

		return <div className='retrospective'>
			<Header dispatcher={dispatcher} />
			<Entries list='good' placeholder="What went well?" {...props} />
			<Entries list='bad' placeholder="What needs improvement?" {...props} />
			<Entries list='next' placeholder="What should we try next time?" {...props} />
			<Footer dispatcher={dispatcher} />
		</div>;
	}
});

module.exports = Retrospective;
