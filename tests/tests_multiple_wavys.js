module("more_wavys", {
		setup: function() {
				var fixture = $("#qunit-fixture"),
						w1 = $("<div></div>").attr("id", "w1").appendTo(fixture),
						w2 = $("<div></div>").attr("id", "w2").appendTo(fixture);
				w1.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
				w2.wavy({ path: [["line", 5, 0, 100, 300, 100]] });
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

test("test_drag_between_wavys_and_drop_outside", function() {
		var w1 = $("#w1"),
				w2 = $("#w2"),
				item = $("<div></div>").text("test").addClass("test-item"),
				slot = $(".wavy-slot:first", w2);
		w1.wavy("addItem", item, 0);

		var coords = findCenter(item);

		item.simulate("mousedown", coords);

		coords = findCenter(slot);
		$(document).simulate("mousemove", coords);

		coords.clientY += 400;
		$(document).simulate("mousemove", coords);

		item.simulate("mouseup", coords);
		item.simulate("click", coords);

		testWavy(w1, [0, 0, 0, 0, 0]);
		testWavy(w2, [item, 0, 0, 0, 0]);
});

test("test_drag_over_wavy1_then_wavy2_and_drop_outside", function() {
		var w1 = $("#w1"),
				w2 = $("#w2"),
				fixture = $("#qunit-fixture"),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture).draggable();

		var coords = findCenter(item);

		item.simulate("mousedown", coords);

		coords = findCenter($(".wavy-slot:first", w1));
		$(document).simulate("mousemove", coords);

		coords = findCenter($(".wavy-slot:first", w2));
		$(document).simulate("mousemove", coords);

		coords.clientY += 1000;
		$(document).simulate("mousemove", coords);

		item.simulate("mouseup", coords);
		item.simulate("click", coords);

		testWavy(w1, [0, 0, 0, 0, 0]);
		testWavy(w2, [0, 0, 0, 0, 0]);
});

test("test_drag_over_wavy1_and_drop_on_wavy2", function() {
		var w1 = $("#w1"),
				w2 = $("#w2"),
				fixture = $("#qunit-fixture"),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture).draggable();

		var coords = findCenter(item);

		item.simulate("mousedown", coords);

		coords = findCenter($(".wavy-slot:first", w1));
		$(document).simulate("mousemove", coords);

		coords = findCenter(w2);
		$(document).simulate("mousemove", coords);

		item.simulate("mouseup", coords);
		item.simulate("click", coords);

		testWavy(w1, [0, 0, 0, 0, 0]);
		testWavy(w2, [item, 0, 0, 0, 0]);
});

test("test_drag_over_wavy1_then_wavy2_then_back_to_wavy1", function() {
		var w1 = $("#w1"),
				w2 = $("#w2"),
				fixture = $("#qunit-fixture"),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture).draggable();

		var coords = findCenter(item);

		item.simulate("mousedown", coords);

		coords = findCenter($(".wavy-slot:first", w1));
		$(document).simulate("mousemove", coords);

		coords = findCenter($(".wavy-slot:first", w2));
		$(document).simulate("mousemove", coords);

		coords = findCenter($(".wavy-slot:first", w1));
		$(document).simulate("mousemove", coords);

		item.simulate("mouseup", coords);
		item.simulate("click", coords);

		testWavy(w1, [item, 0, 0, 0, 0]);
		testWavy(w2, [0, 0, 0, 0, 0]);
});
