'use strict';

var React = require('react');
var Entry = require('./Entry.jsx');
var actions = require('../actions');
var ESCAPE_KEY = 27;

var Entries = React.createClass({
	render: function() {
		var cn = 'list-plain list-retrospective';

		if (this.props.voting) {
			cn += ' list-voting';
		}

		return(
			<section className="phase">
				<form action="#" onSubmit={this.onSubmit}>
					<input
						type="text"
						className="entry-field"
						value={this.state.text}
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
		actions.addItem(this.props.listName, this.state.text.trim());
		this.setState({text: ''});
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
			var p = {
				item: item,
				key: item.id,
				listName: this.props.listName,
				voting: this.props.voting,
				deleteItem: this.deleteItem.bind(this, item.id)
			};

			return <Entry {...p} />;
		}, this);
	},

	deleteItem: function(id) {
		actions.deleteItem(id, this.props.listName);
	}
});

module.exports = Entries;
