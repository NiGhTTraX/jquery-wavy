module("more_wavys", {
		setup: function() {
				var fixture = $("#qunit-fixture"),
						w1 = $("<div></div>").attr("id", "w1").appendTo(fixture),
						w2 = $("<div></div>").attr("id", "w2").appendTo(fixture);
				w1.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
				w2.wavy({ path: [["line", 5, 0, 0, 300, 300]] });
		}
});
test("test_drag_and_drop_item_between_wavys", function() {
		var w1 = $("#w1"),
				w2 = $("#w2");
		var item = $("<div></div>").text("test").addClass("test-item");
		w1.wavy("addItem", item, 2);

		dd(item, "#w2 .wavy-slot:last");

		testWavy(w1, [0, 0, 0, 0, 0]);
		testWavy(w2, [0, 0, 0, 0, item]);
});

test("test_drag_and_drop_item_between_wavys_with_same_scopes", function() {
		var w1 = $("#w1"),
				w2 = $("#w2");

		w1.wavy("option", "scope", "w");
		w2.wavy("option", "scope", "w");

		var i1 = $("<div></div>").text("test1").addClass("test-item"),
				i2 = $("<div></div>").text("test2").addClass("test-item");
		w1.wavy("addItem", i1, 0);
		w2.wavy("addItem", i2, 0);

		dd(i1, "#w2 .wavy-slot:first");

		testWavy(w1, [0, 0, 0, 0, 0]);
		testWavy(w2, [i1, i2, 0, 0, 0]);
});

test("test_drag_and_drop_item_between_wavys_with_different_scopes", function() {
		var w1 = $("#w1"),
				w2 = $("#w2");

		w1.wavy("option", "scope", "w1");
		w2.wavy("option", "scope", "w2");

		var i1 = $("<div></div>").text("test1").addClass("test-item"),
				i2 = $("<div></div>").text("test2").addClass("test-item");
		w1.wavy("addItem", i1, 0);
		w2.wavy("addItem", i2, 0);

		dd(i1, "#w2 .wavy-slot:first");

		testWavy(w1, [i1, 0, 0, 0, 0]);
		testWavy(w2, [i2, 0, 0, 0, 0]);
});

test("test_drag_and_drop_item_between_wavys_with_shifting", function() {
		var w1 = $("#w1"),
				w2 = $("#w2");

		var i1 = $("<div></div>").text("test1").addClass("test-item"),
				i2 = $("<div></div>").text("test2").addClass("test-item");
		w1.wavy("addItem", i1, 0);
		w2.wavy("addItem", i2, 0);

		dd(i1, "#w2 .wavy-slot:first");

		testWavy(w1, [0, 0, 0, 0, 0]);
		testWavy(w2, [i1, i2, 0, 0, 0]);
});

test("test_drag_and_drop_item_between_wavys_back_and_forth", function() {
		var w1 = $("#w1"),
				w2 = $("#w2"),
				item = $("<div></div>").text("test").addClass("test-item");
		w1.wavy("addItem", item, 0);

		dd(item, "#w2 .wavy-slot:first");
		item = $(".test-item");
		dd(item, "#w1 .wavy-slot:last");

		testWavy(w1, [0, 0, 0, 0, item]);
		testWavy(w2, [0, 0, 0, 0, 0]);
});

test("test_drag_and_drop_item_from_wavy_to_full_wavy", function() {
		var w1 = $("#w1"),
				w2 = $("#w2"),
				i1 = $("<div></div>").text("test1").addClass("test-item"),
				i2 = $("<div></div>").text("test2").addClass("test-item");
		w1.wavy("addItem", i1, 0);

		for (var i = 0; i < 5; i++) {
			w2.wavy("addItem", i2.clone(), i);
		}

		dd(i1, "#w2 .wavy-slot:first");

		testWavy(w1, [i1, 0, 0, 0, 0]);
		testWavy(w2, [i2, i2, i2, i2, i2]);
});

