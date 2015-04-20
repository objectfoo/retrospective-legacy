'use strict';

var React = require('react');
var actionTypes = require('../constants').actionTypes;
var EntryText = require('./EntryText.jsx');
var EntryInput = require('./EntryInput.jsx');

var Entries = React.createClass({

	render: function() {
		var data = this.props.store.getAll()[this.props.list] || [], enries;

		enries = data.map(function(item) {
			var content,
				onDoubleClick = this.setEditable.bind(this, item.id);

			if (item.isEditing) {
				content = <EntryInput {...this.props}/>;
			}
			else {
				content = <EntryText text={item.text} {...this.props}/>;
			}

			return <li onDoubleClick={ onDoubleClick } key={item.id}>
				{content}
			</li>;
		}, this);

		return <ul id={this.props.list}>{enries}</ul>;
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
	},


	// ACTIONS
	setEditable: function (itemId) {
		var dispatcher = this.props.dispatcher;

		dispatcher.dispatch({
			actionType: actionTypes.editItem,
			list: this.props.list,
			itemId: itemId
		});
	}
});

module.exports = Entries;
