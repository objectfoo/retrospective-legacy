/*global appLib,console*/
var Editable = (function (lib) {
	"use strict";
	var el = lib.el,
		strings = lib.strings;

	function Editable(node) {
		this.parent = node.parentNode;

		this.node = node;
		node.addEventListener("click", this);
		node.addEventListener("focus", this);

		this.editElement = el("input", {"className": strings.CSS_INLINE_EDITOR});
		this.editElement.addEventListener("blur", this);
		this.editElement.addEventListener("keydown", this);

		this.parent.insertBefore(this.editElement, node);
	}

	Editable.prototype = {

		exitEditMode: function (keyCode) {
			this.parent.classList.remove(strings.CSS_EDITING);

			if (this.editElement.value.length > 0 && keyCode !== 27) {
				this.node.innerHTML = this.editElement.value;
			}
			this.editElement.value = "";
		},

		enterEditMode: function () {
			var edit = this.editElement;

			edit.value = this.node.innerHTML;
			this.parent.classList.add(strings.CSS_EDITING);
			edit.focus();
		},

		processKey: function (keyCode) {
			if (!!~[27, 13].indexOf(keyCode)) {
				this.exitEditMode(keyCode);
			}
		},

		handleEvent: function (e) {
			switch (e.type) {
			case "keydown":		// input element's keydown
				this.processKey(e.keyCode);
				break;
			case "blur":			// blur input element
				this.exitEditMode(e.keyCode);
				break;
			case "click":			// click || focus editable item
			case "focus":
				this.enterEditMode();
			}
		}
	};

	return Editable;
})(appLib);
