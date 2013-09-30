/*global appLib, Editable, List*/
(function (List, Editable, lib) {
	"use strict";
	var good,
		bad,
		$ = lib.$,
		strings = lib.strings,
		today = $("time");

	today.innerHTML = (function (d) {
		return [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("-");
	})(new Date);

	good = new List($("#good"), strings.MSG_GOOD);
	bad = new List($("#bad"), strings.MSG_BAD);
	new Editable($("#teamName"));

	document.body.classList.remove("loading");
	$("#vote").addEventListener("click", bad.toggleVote.bind(bad));

})(List, Editable, appLib);
