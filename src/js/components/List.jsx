'use strict';

var React = require('react');
var actionTypes = require('../constants').actionTypes;

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


/**
 * Entry
 */
var Entry = React.createClass({
	render: function() {
		var item = this.props.item,
			content;

		if (item.isEditing) {
			content = <div>
				<input type="text" /> <button type="button">Save</button>
			</div>;
		}
		else {
			content = item.text;
		}

		return <li onDoubleClick={this.setEditable}>{content}</li>;
	},

	setEditable: function() {
		this.props.dispatcher.dispatch({
			actionType: actionTypes.editItem,
			list: this.props.list,
			itemId: this.props.item.id
		});
	}
});


module.exports = Entries;
