/*global appLib, console*/
var List = (function (lib) {
	"use strict";
	var el = lib.el,
		strings = lib.strings,
		$$ = lib.$$;

	function inputWithPlaceholder(placeholder) {
		var cfg = {
			"type": "text",
			"placeholder" : placeholder
		};

		return el("input", cfg);
	}

	function updateLine(target, node) {
		var line = el("li", [
				el("input", {"type": "number"}),
				el("span", target.value)
			]);

		node.insertBefore(line, node.lastElementChild);
		target.value = "";
	}

	function List(node, placeholder) {
		this.node = node;
		this.entryInput = inputWithPlaceholder(placeholder);
		this.entryLine = el("li", {"className": strings.CSS_INPUT}, [this.entryInput]);
		node.appendChild(this.entryLine);

		this.entryLine.addEventListener("change", this);
		node.addEventListener("click", this);
	}

	List.prototype = {

		toggleVote: function () {
			var action,
			node = this.node;

			if ($$("li", node).length > 1 || node.classList.contains(strings.CSS_VOTING)) {
				action  = node.classList.toggle(strings.CSS_VOTING) ?
					"removeChild":
					"appendChild";
				node[action](this.entryLine);
			}
			else {
				this.entryInput.placeholder = strings.MSG_BAD_PLZ;
				(function (entryInput) {
					setTimeout(function () {
						entryInput.placeholder = strings.MSG_BAD;
					}, 3000);
				})(this.entryInput);
			}
		},

		handleEvent: function (e) {
			switch (e.type) {
			case "change":
				updateLine(e.target, this.node);
				break;
			case "click":
				if (e.target.tagName.toUpperCase() === "SPAN") {
					// if click target is span (.class?) then create editable
					console.log("click in span");
				}
				break;
			}
		}
	};

	return List;
})(appLib);
