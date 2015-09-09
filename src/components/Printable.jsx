'use strict';

var React = require('react');

var Printable = React.createClass({
	render: function() {
		var good, bad, next;

		good = (this.props.store.getAll().good || []).map(function(item) {
			return <div><strong>&middot;</strong> {item.text}</div>;
		});

		bad = (this.props.store.getAll().bad || []).map(function(item) {
			return <div><strong>&middot;</strong> {item.tally} {item.text}</div>;
		});

		next = (this.props.store.getAll().next || []).map(function(item) {
			return <div><strong>&middot;</strong> {item.text}</div>;
		});

		return(
			<div>
				<h2>Retrospective</h2>
				<p>{this.props.date}</p>

				<h3 className="m-top">What went well</h3>
				{good}

				<h3 className="m-top">What needs improvement</h3>
				{bad}

				<h3 className="m-top">What should we try next time</h3>
				{next}
			</div>
		);
	}
});

module.exports = Printable;
