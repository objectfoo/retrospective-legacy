var List = (function (lib) {
	"use strict";

	var el = lib.el,
		strings = lib.strings,
		$ = lib.$,
		$$ = lib.$$;

	//NOTE: IE7/8 will need polyfill for indexOf
	function isExitKey(type, keyCode) {
		return type === "keydown" && !!~[13,9].indexOf(keyCode);
	}

	function isDeleteKey(type, keyCode) {
		return type === "keydown" && keyCode === 8;
	}

	function getLastInput(parent) {
		return $("input", parent.lastChild);
	}

	function isLastInputEmpty(parent) {
		return getLastInput(parent).value.length <= 0;
	}

	function addNewLine(e, parent, placeholder) {
		$("input", parent.appendChild(lineWithPlaceholder(placeholder))).focus();
		e.preventDefault();
	}

	function lineWithPlaceholder(placeholder) {
		return el("li", {className: strings.CSS_INPUT}, [
			el("input", {type: "text", placeholder: placeholder})
		]);
	};

	function List(node, placeholder) {
		this.node = node;
		this.placeholder = placeholder;
		this.node.appendChild(lineWithPlaceholder(this.placeholder));

		this.node.addEventListener("keydown", this);
	}

	List.prototype = {

		toggleVote: function () {},

		handleEvent: function (e) {
			var hostNode = this.node;

			if (isExitKey(e.type, e.keyCode) && !e.shiftKey &&
					e.srcElement === getLastInput(hostNode) &&
					!isLastInputEmpty(hostNode))
			{
				addNewLine(e, hostNode, this.placeholder);
			}
			else if (isDeleteKey(e.type, e.keyCode) &&
					e.srcElement === getLastInput(hostNode) &&
					isLastInputEmpty(hostNode))
			{
				hostNode.removeChild(hostNode.lastChild);
				$("input", hostNode.lastChild).focus();
				e.preventDefault();
				e.stopPropagation();
			}
		}
	};

	return List;
})(appLib);
