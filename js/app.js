/*global appLib, Editable, List*/
(function (List, Editable, lib) {
	"use strict";
	var good,
		bad,
		$ = lib.$,
		strings = lib.strings,
		today = $("time");

	today.innerHTML = lib.shortDate();
	good = new List($("#good"), strings.MSG_GOOD);
	bad = new List($("#bad"), strings.MSG_BAD);
	new Editable($("#teamName"));

	document.body.classList.remove("loading");
	$("#vote").addEventListener("click", bad.toggleVote.bind(bad));
})(List, Editable, appLib);
