'use strict';

var React = require('react');

var Printable = React.createClass({
	render: function() {
		return(
			<div>
				<h2>Retrospective</h2>
				<p>{ this.props.date }</p>

				<h3 className="m-top">What went well</h3>
				{ renderListSection(this.props.data.good) }

				<h3 className="m-top">What needs improvement</h3>
				{ renderListSection(this.props.data.bad) }

				<h3 className="m-top">What should we try next time</h3>
				{ renderListSection(this.props.data.next) }
			</div>
		);
	}
});

module.exports = Printable;

function renderListSection(list) {
	return list.map(function(item) {
		return <div key={ item.id }><strong>&middot;</strong> { item.text }</div>;
	});
}
