'use strict';

var React = require('react');

var EntryEdit = require('./EntryEdit.jsx');
var VotePanel = require('./VotePanel.jsx');

var Entry = React.createClass({
	render: function() {
		var isEditing = this.state.isEditing
			, button = null
			, content = null
			, vote = null
			;

		if (isEditing) {
			content = <EntryEdit {...this.props} toggleEditing={this.toggleEditing} />;
		}
		else {
			if (this.props.votingEnabled) {
				vote = <VotePanel tally={this.props.item.tally} />;
			}

			content = <div className="entry-content" onDoubleClick={this.toggleEditing}>{this.props.item.text}</div>;
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
