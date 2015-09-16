'use strict';

var React = require('react');
var Reflux = require('reflux');
var store = require('../RefluxStore');
var formatDate = require('../lib/formatDate');

var Header = require('./Header.jsx');
var Entries = require('./Entries.jsx');
var Footer = require('./Footer.jsx');
var Printable = require('./Printable.jsx');

var Retrospective = React.createClass({
	mixins: [Reflux.connect(store, 'data')],

	getDefaultProps: function () {
		return { date:formatDate() };
	},

	render: function() {
		if (this.state.printable === true) {
			return <Printable data={ this.state.data } date={ this.props.date } />;
		}

		return (
			<div className='retrospective'>
				<Header date={ this.props.date } />
				<Entries data={ this.state.data } listName="good" placeholder="What went well?" />
				<Entries data={ this.state.data } listName="bad" voting={ true } placeholder="What needs improvement?" />
				<Entries data={ this.state.data } listName="next" placeholder="What should we try next time?" />
				<Footer setPrintable={ this.setPrintable } />
			</div>
		);
	},

	setPrintable: function() {
		this.setState({ printable: true });
	}
});

module.exports = Retrospective;
