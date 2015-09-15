'use strict';

var React = require('react');
// var store = require('../retrospectiveStore');
var Reflux = require('reflux');
var store = require('../RefluxStore');
var formatDate = require('../lib/formatDate');

var Header = require('./Header.jsx');
var Entries = require('./Entries.jsx');
// var Footer = require('./Footer.jsx');
// var Printable = require('./Printable.jsx');

var Retrospective = React.createClass({
	mixins: [Reflux.connect(store, 'data')],

	getDefaultProps: function () {
		return { date:formatDate() };
	},

	render: function() {
		return (
			<div className='retrospective'>
				<Header date={this.props.date} />
				<Entries store={this.state.data} listName="good" placeholder="What went well?" />
				<Entries store={this.state.data} listName="bad" votingEnabled={true} placeholder="What needs improvement?" />
				<Entries store={this.state.data} listName="next" placeholder="What should we try next time?" />
			</div>
		);
	},

	setPrintable: function(val) {
		val = val || false;
		this.setState({ printable: val });
	}
});

module.exports = Retrospective;
