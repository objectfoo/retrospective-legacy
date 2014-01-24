/*global jQuery, Mustache*/
jQuery(function ($) {
	'use strict';

	var Utils = {
		uuid: function () {
			var i, random, uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) { uuid += '-'; }
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}
			return uuid;
		},
		store: function (key, data) {
			/*jshint eqnull:true*/
			var store = data != null ?
				localStorage.setItem(key, JSON.stringify(data)) :
				localStorage.getItem(key);

			return (store && JSON.parse(store)) || [];
		},
		clearStore: function () {
			localStorage.clear();
		},
		todayAsString: function () {
			var d = new Date();

			return [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('-');
		},
		getItem: function (list, elem, callback) {
			var id = $(elem).closest('li').data('id');

			$.each(list, function (index, obj) {
				if (obj.id === id) {
					callback.call(App, list, index, obj);
					return false;
				}
			});
		}
	};

	var App = {
		init: function () {
			App.good = Utils.store('retro-good');
			App.bad = Utils.store('retro-bad');
			App.next = Utils.store('retro-next');

			App.cacheElems();
			App.bindEvents();
			App.render();

			$('.time-retrospective').first().text(Utils.todayAsString());
			App.$retrospective.addClass('fade--in');
		},
		cacheElems: function () {
			App.itemTemplate = Mustache.compile($('#item-template').html());
			App.$retrospective = $('#retrospective');

			App.$goodList = $('#goodList');
			App.$badList = $('#badList');
			App.$nextList = $('#nextList');

			App.$goodInput = $('#goodInput');
			App.$badInput = $('#badInput');
			App.$nextInput = $('#nextInput');

			App.$clearAll = $('.clearAll').first();
			App.$mode = $('.mode').first();
		},
		bindEvents: function () {
			// new item field
			App.$goodInput.on('keyup', App.create);
			App.$badInput.on('keyup', App.create);
			App.$nextInput.on('keyup', App.create);

			// destroy button
			App.$goodList.on('click', '.destroy', App.good, App.clear);
			App.$badList.on('click', '.destroy', App.bad, App.clear);
			App.$nextList.on('click', '.destroy', App.next, App.clear);

			// label
			App.$goodList.on('dblclick', '.item', App.good, App.edit);
			App.$badList.on('dblclick', '.item', App.bad, App.edit);
			App.$nextList.on('dblclick', '.item', App.next, App.edit);

			// edit field
			App.$goodList.on('change', '.edit', App.good, App.update);
			App.$badList.on('change', '.edit, .votes', App.bad, App.update);
			App.$nextList.on('change', '.edit', App.next, App.update);

			App.$goodList.on('keyup', '.edit', App.exitIfEsc);
			App.$badList.on('keyup', '.edit', App.exitIfEsc);
			App.$nextList.on('keyup', '.edit', App.exitIfEsc);

			App.$goodList.on('blur', '.edit', App.endEditing);
			App.$badList.on('blur', '.edit', App.endEditing);
			App.$nextList.on('blur', '.edit', App.endEditing);

			// arrow keys in votes field
			App.$badList.on('keydown', '.votes', App.good, App.editVote);

			// Buttons
			App.$clearAll.on('click', App.clearAll);
			App.$mode.on('click', App.showPrintable);
		},
		showPrintable: function () {
			var main = $('#printable-main').html(),
				part = $('#printable-item').html(),
				data = {
					date: Utils.todayAsString(),
					good: { items: App.good },
					bad: { items: App.bad },
					next: { items: App.next }
				};

			/*jshint evil:true*/
			document.write( Mustache.render( main, data, { list: part } ) );
		},
		editVote: function (e) {
			var change = e.which === 38 ? 1 : -1;

			if (e.which === 38 || e.which === 40) {
				e.target.value = Math.max(0, parseInt(e.target.value, 10) + change);
				e.data = App.bad;
				App.update.call(e.target, e);
			}
		},
		maybeAddHasEntriesClass: function (list, predicate) {
			var action = predicate ? 'addClass' : 'removeClass';
			list[action]('has-entries');
		},
		render: function () {
			App.maybeAddHasEntriesClass(App.$goodList, !!App.good.length);
			App.$goodList.html(App.itemTemplate({items: App.good}));

			App.maybeAddHasEntriesClass(App.$badList, !!App.bad.length);
			App.$badList.html(App.itemTemplate({items: App.bad}));

			App.maybeAddHasEntriesClass(App.$nextList, !!App.next.length);
			App.$nextList.html(App.itemTemplate({items: App.next}));

			Utils.store('retro-good', App.good);
			Utils.store('retro-bad', App.bad);
			Utils.store('retro-next', App.next);
		},
		create: function (e) {
			var $input = $(this),
				val =  $.trim($input.val());

			if (e.which !== 13 || !val) {
				return;
			}

			if (this.id === 'goodInput') {
				App.good.unshift({id: Utils.uuid(), title: val});
			} else if (this.id === 'badInput') {
				App.bad.unshift({id: Utils.uuid(), title: val, votes: 0, hasVotes: true});
			} else if (this.id === 'nextInput') {
				App.next.unshift({id: Utils.uuid(), title: val});
			}
			$input.val('');
			App.render();
		},
		edit: function () {
			$(this).closest('li').
				addClass('is-editing').
				find('.edit').first().focus();
		},
		clear: function (e) {
			Utils.getItem(e.data, e.target, function (list, index) {
				list.splice(index, 1);
			});
			App.render();
		},
		clearAll: function () {
			App.good.length = 0;
			App.bad.length = 0;
			App.next.length = 0;
			App.render();
		},
		update: function (e) {
			var newVal = $.trim($(this).val());

			Utils.getItem(e.data, e.target, function (list, index) {
				if ($(e.target).hasClass('edit')){
					list[index].title = newVal;
					App.render();
				} else {
					list[index].votes = parseInt(newVal, 10) || 0;
					Utils.store('retro-bad', App.bad);
				}
			});
		},
		exitIfEsc: function (e) {
			if (e.which === 27) {
				$(this).blur();
			}
		},
		endEditing: function () {
			$(this).closest('li').removeClass('is-editing');
		}
	};

	App.init();
});
