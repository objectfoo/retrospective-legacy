'use strict';

var React = require('react');
// var store = require('../retrospectiveStore');
var Reflux = require('reflux');
var store = require('../RefluxStore');

var Header = require('./Header.jsx');
var Entries = require('./Entries.jsx');
// var Footer = require('./Footer.jsx');
// var Printable = require('./Printable.jsx');

var Retrospective = React.createClass({
	mixins: [Reflux.connect(store, 'data')],

	getDefaultProps: function () {
		var d = (new Date()).toJSON(), dParts;

		d = d.replace(/T.*/, '');
		dParts = d.split('-');
		dParts = [dParts[1], dParts[2], dParts[0]];

		return { date: dParts.join('/') };
	},

	render: function() {
		return (
			<div className='retrospective'>
				<Header date={this.props.date} />
				<Entries store={this.state.data} list="good" placeholder="What went well?" />
			</div>
		);
	},

	setPrintable: function(val) {
		val = val || false;
		this.setState({ printable: val });
	}
});

module.exports = Retrospective;
