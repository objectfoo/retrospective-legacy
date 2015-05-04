'use strict';

var React = require('react');
var Entry = require('./Entry.jsx');

var Entries = React.createClass({

	render: function() {
		var entries, data;

		data = this.props.store.getAll()[this.props.list] || [];

		entries = data.map(function(item) {
			return <Entry {...this.props} key={item.id} item={item} />;
		}, this);

		return <ul id={this.props.list}>{entries}</ul>;
	},

	handleChange: function() {
		this.forceUpdate();
	},

	// LIFECYCLE
	componentDidMount: function() {
		this.props.store.on('change:all', this.handleChange);
		this.props.store.on('change:' + this.props.list, this.handleChange);
	},

	componentWillUnmount: function() {
		this.props.store.off('change:all', this.handleChange);
		this.props.store.off('change:' + this.props.list, this.handleChange);
	}

});



module.exports = Entries;
