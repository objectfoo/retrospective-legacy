var appLib = (function () {
	"use strict";

	var  strings = {
		MSG_GOOD: "Went well",
		MSG_BAD: "Needs Improvement",
		MSG_BAD_PLZ: "It can't all be good",
		CSS_VOTING: "is-voting",
		CSS_EDITING: "is-editing",
		CSS_INLINE_EDITOR: "inlineEditor",
		CSS_INPUT: "input"
	};

	function $(expression, node) {
		return (node || document).querySelector(expression);
	}

	function $$(expression, node) {
		return (node || document).querySelectorAll(expression);
	}

	function shortDate() {
		var d = new Date();
		return [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("-");
	}

	// is x an object with a numeric length, but not a DOM element?
	function isList(x) {
		return !!x &&
				typeof x === "object" &&
				typeof x.length === "number" &&
				!x.tagName;
	}

	// is x a string or array like object
	function isContent(x) {
		/*jshint eqnull:true*/
		return x != null &&
				(typeof x.nodeType !== "undefined" ||
				typeof x === "string" ||
				isList(x));
	}

	// set element property
	// does not handle style or data
	function setProp(properties, element) {
		var name;

		properties = properties || {};

		if (properties.hasOwnProperty("type")) {
			element.type = properties.type;
			delete properties.type;
		}

		for (name in properties) {
			if (properties.hasOwnProperty(name)) {
				element[name] = properties[name];
			}
		}
	}

	function append(content, element) {
		var i, l, what;

		for (i = 0, l = content.length; i < l; ++i) {

			if (typeof content[i] === "string") {
				what = document.createTextNode(content[i]);
			} else {
				what = content[i];
			}
			element.appendChild(what);
		}
	}

	// create an element
	// does not support data- or style props
	function el(tagName, attrProps, content) {
		var element;

		if (!content && isContent(attrProps)) {
			return el(tagName, {}, attrProps);
		}

		element = document.createElement(tagName);
		setProp(attrProps, element);
		append(content || [], element);

		return element;
	}

	return {
		$: $,
		$$: $$,
		shortDate: shortDate,
		el: el,
		strings: strings
	};
})();
