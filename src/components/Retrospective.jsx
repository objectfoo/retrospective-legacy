'use strict';

var React = require('react');
var store = require('../retrospectiveStore');

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
		if (this.state.printable === true) {
			return <Printable store={store} date={this.props.date}/>;
		} else {
			return (
				<div className='retrospective'>
					<Header date={this.props.date} />
					<Entries list='good' placeholder="What went well?" store={store} />
					<Entries list='bad' votingEnabled="true" placeholder="What needs improvement?" store={store} />
					<Entries list='next' placeholder="What should we try next time?" store={store} />
					<Footer store={store} setPrintable={this.setPrintable} />
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
