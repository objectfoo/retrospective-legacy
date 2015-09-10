'use strict';

var React = require('react');
var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher();
var store = require('../store/RetrospectiveStore')(dispatcher);

var Header = require('./Header.jsx');
var Entries = require('./Entries.jsx');
var Footer = require('./Footer.jsx');
var Printable = require('./Printable.jsx');

var Retrospective = React.createClass({
	getInitialState: function () {
		return { printable: false };
	},

	getDefaultProps: function () {
		var d = (new Date()).toJSON(), dParts;

		d = d.replace(/T.*/, '');
		dParts = d.split('-');
		dParts = [dParts[1], dParts[2], dParts[0]];

		return { date: dParts.join('/') };
	},

	render: function() {
		var props = { store: store, dispatcher: dispatcher };

		if (this.state.printable === true) {
			return <Printable store={store} date={this.props.date}/>;
		} else {
			return (
				<div className='retrospective'>
					<Header dispatcher={dispatcher} date={this.props.date} />
					<Entries list='good' placeholder="What went well?" {...props} />
					<Entries list='bad' votingEnabled="true" placeholder="What needs improvement?" {...props} />
					<Entries list='next' placeholder="What should we try next time?" {...props} />
					<Footer {...props} setPrintable={this.setPrintable} />
				</div>
			);
		}
	},

	setPrintable: function(val) {
		val = val || false;
		this.setState({ printable: val });
	}
});

module.exports = Retrospective;
