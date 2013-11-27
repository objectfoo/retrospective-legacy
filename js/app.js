/*jshint unused:false*/
/*global jQuery, Handlebars*/
jQuery(function ($) {
	'use strict';

	var Utils = {
		uuid: function () {
			/*jshint bitwise:false */
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

			return [d.getMonth() + 1, d.getDay(), d.getFullYear()].join('-');
		}
	};

	var App = {
		init: function () {
			App.good = Utils.store('retro-good');
			App.bad = Utils.store('retro-bad');
			App.cacheElements();
			App.bindEvents();
			App.render();

			$('time').first().text(Utils.todayAsString());
			App.$retrospective.addClass('fade--in');
		},
		cacheElements: function () {
			App.goodTemplate = Handlebars.compile($('#good-template').html());
			App.badTemplate = Handlebars.compile($('#bad-template').html());
			App.$retrospective = $('#retrospective');
			App.$goodList = $('#goodList');
			App.$badList = $('#badList');
			App.$goodInput = $('#goodInput');
			App.$badInput = $('#badInput');
			App.$clearAll = $('.clearAll').first();
			App.$printable = $('.printable').first();
		},
		bindEvents: function () {
			// render, update store
			App.$goodInput.on('keyup', App.create);
			App.$badInput.on('keyup', App.create);

			// render, update store
			App.$goodList.on('click', '.destroy', App.good, App.clear);
			App.$badList.on('click', '.destroy', App.bad, App.clear);

			// enter render mode
			App.$goodList.on('dblclick', 'label', App.good, App.edit);
			App.$badList.on('dblclick', 'label', App.bad, App.edit);

			// exit editing, render, update store
			App.$goodList.on('change', '.edit', App.good, App.update);
			App.$badList.on('change', '.edit, .votes', App.bad, App.update);

			// render
			App.$goodList.on('keyup', '.edit', App.exitIfEsc);
			App.$badList.on('keyup', '.edit', App.exitIfEsc);

			// remove editing class
			App.$goodList.on('blur', '.edit', App.endEditing);
			App.$badList.on('blur', '.edit', App.endEditing);

			// btn events
			App.$clearAll.on('click', App.clearAll);
			App.$printable.on('click', function () { alert('TODO'); });
		},
		render: function () {
			if (App.good.length) {
				App.$goodList.addClass('has-entries');
			} else {
				App.$goodList.removeClass('has-entries');
			}
			App.$goodList.html(App.goodTemplate(App.good));

			if (App.bad.length) {
				App.$badList.addClass('has-entries');
			} else {
				App.$badList.removeClass('has-entries');
			}
			App.$badList.html(App.badTemplate(App.bad));

			Utils.store('retro-good', App.good);
			Utils.store('retro-bad', App.bad);
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
				App.bad.unshift({id: Utils.uuid(), title: val, votes: 0});
			}
			$input.val('');
			App.render();
		},
		edit: function (e) {
			$(this).closest('li').
				addClass('is-editing').
				find('.edit').first().focus();
		},
		clear: function (e) {
			App.getItem(e.data, e.target, function (list, index) {
				list.splice(index, 1);
			});
			App.render();
		},
		clearAll: function () {
			App.good.length = 0;
			App.bad.length = 0;
			App.render();
		},
		update: function (e) {
			var newVal = $.trim($(this).val());

			App.getItem(e.data, e.target, function (list, index, obj) {
				if ($(e.target).hasClass('edit')){
					list[index].title = newVal;
					App.render();
				} else {
					list[index].votes = parseInt(newVal, 10);
					Utils.store('retro-bad', App.bad);
				}
			});
		},
		getItem: function (list, elem, callback) {
			var id = $(elem).closest('li').data('id');

			$.each(list, function (index, obj) {
				if (obj.id === id) {
					callback.call(App, list, index, obj);
					return false;
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
