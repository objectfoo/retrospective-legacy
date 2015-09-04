'use strict';

var React = require('react');
var Entry = require('./Entry.jsx');
var actionTypes = require('../constants').actionTypes;
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var Entries = React.createClass({
	getInitialState: function() {
		return { text: '' };
	},

	render: function() {
		var entries, data;

		data = this.props.store.getAll()[this.props.list] || [];

		entries = data.map(function(item) {
			return <Entry {...this.props} key={item.id} item={item} />;
		}, this);

		return <ul id={this.props.list}>
			<li>
				<input type="text"
					value={this.state.value}
					onChange={this.handleChange}
					onKeyDown={this.onKeyDown} />
			</li>
			{entries}
		</ul>;
	},

	onKeyDown: function(evt) {

		if (evt.which === ENTER_KEY) {
			this.props.dispatcher.dispatch({
				actionType: actionTypes.addItem,
				list: this.props.list,
				value: this.state.text
			});
			evt.target.value = '';
		}

		if (evt.which === ESCAPE_KEY) {
			console.log(this.state.text);
			console.log('reset input field of list "' + this.props.list + '"');
		}
	},

	handleChange: function(evt) {
		this.setState({
			text: evt.target.value
		});
	},

	handleUpdate: function() {
		this.forceUpdate();
	},

	// LIFECYCLE
	componentDidMount: function() {
		this.props.store.on('change:all', this.handleUpdate);
		this.props.store.on('change:' + this.props.list, this.handleUpdate);
	},

	componentWillUnmount: function() {
		this.props.store.off('change:all', this.handleUpdate);
		this.props.store.off('change:' + this.props.list, this.handleUpdate);
	}

});

module.exports = Entries;
