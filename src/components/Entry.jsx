'use strict';

var React = require('react');

var EntryEdit = require('./EntryEdit.jsx');
var VotePanel = require('./VotePanel.jsx');

var Entry = React.createClass({
	render: function() {
		return <li>{ this.votePanel() }{ this.content() }{ this.deleteButton() }</li>;
	},

	votePanel: function() {
		var voting = this.props.voting
			, isEditing = this.state.isEditing
			, tally = this.props.item.tally
			, listName = this.props.listName
			, id = this.props.item.id;

		if (!isEditing && voting) {
			return <VotePanel tally={ tally } listName={ listName } id={ id } />;
		}
		else {
			return null;
		}
	},

	content: function() {
		var text = this.props.item.text;

		if (this.state.isEditing) {
			return <EntryEdit { ...this.props } toggleEditing={ this.toggleEditing } />;
		}
		else {
			return <div className="entry-content" onDoubleClick={ this.toggleEditing }>{ text }</div>;
		}
	},

	deleteButton: function() {
		if (!this.state.isEditing) {
			return(
				<button
					tabIndex="-1"
					className="btn-close"
					type="button"
					onClick={ this.props.deleteItem }>{ String.fromCharCode(10006) }</button>
			);
		}
		else {
			return null;
		}
	},

	getInitialState: function() {
		return { isEditing: false };
	},

	toggleEditing: function() {
		this.setState({ isEditing: !this.state.isEditing });
	}
});

module.exports = Entry;
