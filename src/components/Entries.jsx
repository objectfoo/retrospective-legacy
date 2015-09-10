'use strict';

var React = require('react');
var Entry = require('./Entry.jsx');
var actionTypes = require('../constants').actionTypes;
var dispatcher = require('../dispatcher');
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var Entries = React.createClass({
	getInitialState: function() {
		return { text: '' };
	},

	componentDidMount: function() {
		this.props.store.on('change:all', this.handleUpdate);
		this.props.store.on('change:' + this.props.list, this.handleUpdate);
	},

	componentWillUnmount: function() {
		this.props.store.off('change:all', this.handleUpdate);
		this.props.store.off('change:' + this.props.list, this.handleUpdate);
	},

	render: function() {
		var entries, cn = 'list-plain list-retrospective';

		entries = (this.props.store.getAll()[this.props.list] || []).map(function(item) {
			return <Entry {...this.props} key={item.id} item={item} />;
		}, this);

		if (this.props.votingEnabled) {
			cn = cn + ' list-voting';
		}

		return (
			<section className="phase">
				<input className="entry-field"
					type="text"
					placeholder={this.props.placeholder}
					value={this.state.value}
					onKeyDown={this.handleKeyDown} />

				<ul id={this.props.list} className={cn}>
					{entries}
				</ul>

			</section>
		);
	},

	handleKeyDown: function(event) {
		if (event.which === ENTER_KEY && event.target.value.length > 0) {
			dispatcher.dispatch({
				actionType: actionTypes.addItem,
				list: this.props.list,
				value: event.target.value.trim()
			});
			event.target.value = '';
		}
		else if (event.which === ESCAPE_KEY) {
			event.target.value = this.state.text;
		}
	},

	handleUpdate: function() {
		this.forceUpdate();
	}
});

module.exports = Entries;
