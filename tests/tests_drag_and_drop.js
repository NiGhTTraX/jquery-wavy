module("drag_and_drop", {
		setup: function() {
				var fixture = $("#qunit-fixture"),
						w = $("<div></div>");
				w.appendTo(fixture);
				w.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
		}
});
test("test_drag_and_drop_item_to_first_slot", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable();

		dd(item, $(".wavy-slot:first", w));
		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_and_drop_item_to_last_slot", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable();

		dd(item, $(".wavy-slot:last", w));
		var expected = [0, 0, 0, 0, item];
		testWavy(w, expected);
});

test("test_drag_and_drop_item_to_occupied_first_slot", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item1 = $("<div></div>").text("test1").addClass("test-item"),
				item2 = $("<div></div>").text("test2").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item1.draggable({ helper: "clone" });
		item2.draggable({ helper: "clone" });

		var slot = $(".wavy-slot:first", w);

		dd(item1, slot);
		dd(item2, slot);

		var expected = [item2, item1, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_and_drop_item_to_occupied_last_slot", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item1 = $("<div></div>").text("test1").addClass("test-item"),
				item2 = $("<div></div>").text("test2").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item1.draggable({ helper: "clone" });
		item2.draggable({ helper: "clone" });

		var slot = $(".wavy-slot:last", w);

		dd(item1, slot);
		dd(item2, slot);

		var expected = [0, 0, 0, item1, item2];
		testWavy(w, expected);
});

test("test_drag_and_drop_full_wavy", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item1 = $("<div></div>").text("test1").addClass("test-item"),
				item2 = $("<div></div>").text("test2").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);

		w.wavy("addItem", item1.clone(), 0);
		w.wavy("addItem", item2.clone(), 1);
		w.wavy("addItem", item1.clone(), 2);
		w.wavy("addItem", item2, 3);
		w.wavy("addItem", item1, 4);

		var to = $(".wavy-slot:first", w);
		dd(item1, to);

		var expected = [item1, item1, item2, item1, item2];
		testWavy(w, expected);
});

test("test_drag_and_drop_item_to_wavy_itself", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable({ helper: "clone" });

		dd(item, $(".wavy", fixture));

		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});


module("drag_and_drop", {
		setup: function() {
				var fixture = $("#qunit-fixture"),
						w = $("<div></div>");
				w.appendTo(fixture);
				w.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
		}
});
test("test_drag_and_drop_item_in_wavy_from_first_to_last_slot", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item, 0);

		dd(item, $(".wavy-slot:last", w));

		var expected = [0, 0, 0, 0, item];
		testWavy(w, expected);
});

test("test_drag_and_drop_item_in_wavy_from_last_to_first", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item, 4);

		dd(item, $(".wavy-slot:first", w));

		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_and_drop_item_in_wavy_back_and_forth", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item, 0);

		dd(item, $(".wavy-slot:last", w));
		dd(item, $(".wavy-slot:first", w));

		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_item_in_wavy_and_drop_on_wavy", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item, 0);

		dd(item, $(".wavy", fixture));

		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_and_drop_item_in_wavy_that_shifts_others", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item1 = $("<div></div>").text("test1").addClass("test-item"),
				item2 = $("<div></div>").text("test2").addClass("test-item"),
				item3 = $("<div></div>").text("test3").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item3.appendTo(fixture);

		w.wavy("addItem", item1, 0);
		w.wavy("addItem", item2, 1);
		w.wavy("addItem", item3, 2);

		dd(item3, $(".wavy-slot:first", w));

		var expected = [item3, item1, item2, 0, 0];
		testWavy(w, expected);
});

test("test_drag_and_drop_item_outside_wavy", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 0);

		item.simulate("drag", {dx: 500, dy: 500});

		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_over_slot_and_drop_on_wavy", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item"),
				slot = $(".wavy-slot:first", w);
		w.wavy("addItem", item, 0);

		item.simulate("drag", {dx: 500, dy: 500});

		var coords = findCenter(item);

		item.simulate("mousedown", coords);

		coords = findCenter(slot);
		$(document).simulate("mousemove", coords);

		coords.clientY += 30;
		$(document).simulate("mousemove", coords);

		item.simulate("mouseup", coords);
		item.simulate("click", coords);

		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_over_slot_and_drop_outside", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item"),
				slot = $(".wavy-slot:first", w);
		item.appendTo(fixture).draggable();

		var coords = findCenter(item);

		item.simulate("mousedown", coords);

		coords = findCenter(slot);
		$(document).simulate("mousemove", coords);

		coords.clientY += 400;
		$(document).simulate("mousemove", coords);

		item.simulate("mouseup", coords);
		item.simulate("click", coords);

		var expected = [0, 0, 0, 0, 0];
		testWavy(w, expected);
});

