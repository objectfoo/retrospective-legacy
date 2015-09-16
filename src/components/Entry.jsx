'use strict';

var React = require('react');

var EntryEdit = require('./EntryEdit.jsx');
var VotePanel = require('./VotePanel.jsx');

var Entry = React.createClass({
	render: function() {
		var isEditing = this.state.isEditing
			, text = this.props.item.text
			, tally = this.props.item.tally
			, id = this.props.item.id
			, listName = this.props.listName
			, button = null
			, content = null
			, vote = null
			;

		if (isEditing) {
			content = <EntryEdit {...this.props} toggleEditing={this.toggleEditing} />;
		}
		else {
			if (this.props.voting) {
				vote = <VotePanel tally={tally} listName={listName} id={id} />;
			}

			content = <div className="entry-content" onDoubleClick={this.toggleEditing}>{text}</div>;
			button = <button tabIndex="-1" className="btn-close" type="button" onClick={this.props.deleteItem}>{String.fromCharCode(10006)}</button>;
		}

		return <li>{vote}{content}{button}</li>;
	},

	getInitialState: function() {
		return { isEditing: false };
	},

	toggleEditing: function() {
		this.setState({ isEditing: !this.state.isEditing });
	}
});

module.exports = Entry;
