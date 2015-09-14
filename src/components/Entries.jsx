'use strict';

var React = require('react');
var Entry = require('./Entry.jsx');
var actions = require('../actions');
var ESCAPE_KEY = 27;

var Entries = React.createClass({
	render: function() {
		var cn = 'list-plain list-retrospective';

		return(
			<section className="phase">
				<form action="#" onSubmit={this.onSubmit}>
					<input
						ref="noteInput"
						type="text"
						className="entry-field"
						value={this.state.value}
						placeholder={this.props.placeholder}
						onKeyDown={this.onKeyDown}
						onChange={this.onChange} />
				</form>
				<ul id={this.props.listName} className={cn}>
					{this.renderEntries()}
				</ul>
			</section>
		);
	},

	getInitialState: function() {
		return {text: ''};
	},

	onSubmit: function(event) {
		var inputField = React.findDOMNode(this.refs.noteInput);

		actions.addItem(this.props.listName, this.state.text.trim());
		inputField.value = '';
		event.preventDefault();
	},

	onChange: function(event) {
		this.setState({ text: event.target.value });
	},

	onKeyDown: function(event) {
		if (event.which === ESCAPE_KEY) {
			event.target.value = this.state.text;
		}
	},

	renderEntries: function() {
		var store = this.props.store
			, listName = this.props.listName;

		return store[listName].map(function(item) {
			return <Entry item={item} key={item.id} listName={this.props.listName} deleteItem={this.deleteItem.bind(this, item.id)}/>;
		}, this);
	},

	deleteItem: function(id) {
		actions.deleteItem(id, this.props.listName);
	}
});

module.exports = Entries;
