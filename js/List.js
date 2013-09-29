var List = (function (lib) {
	"use strict";

	var el = lib.el,
		strings = lib.strings,
		$ = lib.$,
		$$ = lib.$$;

	//NOTE: indexOf doesn't work in ie7/ie8
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

	function shouldAddLine(e, hostNode) {
		return isExitKey(e.type, e.keyCode) &&
				!e.shiftKey &&
				e.srcElement === getLastInput(hostNode) &&
				!isLastInputEmpty(hostNode)
	}

	function shouldDeleteLine(e, hostNode) {
		return isDeleteKey(e.type, e.keyCode) &&
				e.srcElement.value.length <= 0 &&
				hostNode.children.length > 1
	}

	function addNewLine(e, parent, placeholder) {
		$("input", parent.appendChild(lineWithPlaceholder(placeholder))).focus();
		e.preventDefault();
	}

	function deleteLine(e, hostNode) {
		// TODO: ...ElementSibling doesn't work in ie7/ie8
		var focusEl = e.srcElement.parentNode.previousElementSibling ||
				e.srcElement.parentNode.nextElementSibling ||
				e.srcElement.parentNode.lastElementChild;

		hostNode.removeChild(e.srcElement.parentNode);
		$("input", focusEl).focus();
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

			if (shouldAddLine(e, hostNode)) {
				addNewLine(e, hostNode, this.placeholder);
			}
			else if (shouldDeleteLine(e, hostNode)) {
				deleteLine(e, hostNode);
				e.preventDefault();
				e.stopPropagation();
			}
		}
	};

	return List;
})(appLib);
