module("core");
test("test_create", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy();

		ok(w.hasClass("wavy"));
});

test("test_create_with_path", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 2, 0, 0, 100, 100]] });

		equal($(".wavy-slot", w).length, 2);
});

test("test_destroy", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 2, 0, 0, 100, 100]] });

		w.wavy("destroy");

		equal($(".wavy-slot", w).length, 0);
		ok(!w.hasClass("wavy"));
});

test("test_destroy_full", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 1, 0, 0, 100, 100]] });

		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item);
		w.wavy("destroy");

		equal($(".test-item").length, 0);
		ok(!w.hasClass("wavy"));
		ok(!w.hasClass("full"));
});

test("test_place_line_wavy", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 10, 0, 0, 300, 300]] });

		equal($(".wavy-slot", w).length, 10);

		var expectedX = [0, 33, 67, 100, 133, 167, 200, 233, 267, 300];
		var expectedY = [0, 33, 67, 100, 133, 167, 200, 233, 267, 300];
		$(".wavy-slot", w).each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
				i++;
		});
});

test("test_place_arc_wavy", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["arc", 10, 150, 150, 150, 0, 360]] });

		equal($(".wavy-slot", w).length, 10);

		var expectedX = [300, 271, 196, 104, 29, 0, 29, 104, 196, 271];
		var expectedY = [150, 238, 293, 293, 238, 150, 62, 7, 7, 62];
		$(".wavy-slot", w).each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
				i++;
		});
});

test("test_place_bezier_wavy", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["bezier", 8, 0, 0, 300, 300, 50, 250, 250, 50]] });

		equal($(".wavy-slot", w).length, 8);

		var expectedX = [0, 30, 73, 123, 177, 227, 270, 300];
		var expectedY = [0, 82, 125, 144, 156, 175, 218, 300];
		$(".wavy-slot", w).each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
				i++;
		});
});

test("test_make_sortable_custom_wavy", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);

		var slot1 = $("<div></div>").addClass("wavy-slot");
		slot1.css({ left: "10px", top: "23px" });
		slot1.appendTo(w);

		var slot2 = $("<div></div>").addClass("wavy-slot");
		slot2.css({ left: "42px", top: "99px" });
		slot2.appendTo(w);

		w.wavy({ size: 2 });

		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test2").addClass("test-item");
		w.wavy("addItem", item1, 0);
		w.wavy("addItem", item2, 0);

		var expected = [item2, item1];
		testWavy(w, expected);
});

test("test_destroy_custom_wavy", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);

		var slot1 = $("<div></div>").addClass("wavy-slot");
		slot1.css({ left: "10px", top: "23px" });
		slot1.appendTo(w);

		var slot2 = $("<div></div>").addClass("wavy-slot");
		slot2.css({ left: "42px", top: "99px" });
		slot2.appendTo(w);

		w.wavy({ size: 2 });
		w.wavy("destroy");

		equal($(".wavy-slot").length, 0);
		ok(!w.hasClass("wavy"));
});

test("test_add_item_removes_item", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 10, 0, 0, 300, 0]] });

		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item);
		equal($(".test-item", fixture).length, 1);
});

test("test_add_item_clone", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 10, 0, 0, 300, 0]] });

		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item.clone());
		equal($(".test-item", fixture).length, 2);
});

test("test_drag_and_drop_item_without_helper_clone_retains_item", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 10, 0, 0, 300, 0]] });

		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable();

		dd(item, ".wavy-slot:first");

		equal($(".test-item", fixture).length, 2);
});

test("test_drag_and_drop_item_with_helper_clone_retains_item", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 10, 0, 0, 300, 0]] });

		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable({ helper: "clone" });

		dd(item, ".wavy-slot:first");

		equal($(".test-item", fixture).length, 2);
});

test("test_shift_items_from_first", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 3, 0, 0, 300, 0]] });

		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test1").addClass("test-item");
		var item3 = $("<div></div>").text("test1").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item3.appendTo(fixture);

		w.wavy("addItem", item1);
		w.wavy("addItem", item2);
		w.wavy("addItem", item3);

		var expected = [item3, item2, item1];
		testWavy(w, expected);
});

test("test_shift_items_from_last", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 3, 0, 0, 300, 0]] });

		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test1").addClass("test-item");
		var item3 = $("<div></div>").text("test1").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item3.appendTo(fixture);

		w.wavy("addItem", item1, 2);
		w.wavy("addItem", item2, 2);
		w.wavy("addItem", item3, 2);

		var expected = [item1, item2, item3];
		testWavy(w, expected);
});

test("test_shift_items_from_middle_to_right", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 3, 0, 0, 300, 0]] });

		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test1").addClass("test-item");
		var item3 = $("<div></div>").text("test1").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item3.appendTo(fixture);

		w.wavy("addItem", item1, 0);
		w.wavy("addItem", item2, 1);
		w.wavy("addItem", item3, 1);

		var expected = [item2, item3, item1];
		testWavy(w, expected);
});

test("test_shift_items_from_middle_to_left", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 3, 0, 0, 300, 0]] });

		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test1").addClass("test-item");
		var item3 = $("<div></div>").text("test1").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item3.appendTo(fixture);

		w.wavy("addItem", item1, 2);
		w.wavy("addItem", item2, 1);
		w.wavy("addItem", item3, 1);

		var expected = [item1, item3, item2];
		testWavy(w, expected);
});

test("test_shift_direction_closest", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 5, 0, 0, 300, 0]] });

		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test1").addClass("test-item");
		var item3 = $("<div></div>").text("test1").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item3.appendTo(fixture);

		w.wavy("addItem", item1, 2);
		w.wavy("addItem", item2, 3);
		w.wavy("addItem", item3, 2);

		var expected = [0, item1, item3, item2, 0];
		testWavy(w, expected);
});

test("test_shift_direction_right", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 5, 0, 0, 300, 0]], shiftDirection: "right" });

		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test1").addClass("test-item");
		var item3 = $("<div></div>").text("test1").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item3.appendTo(fixture);

		w.wavy("addItem", item1, 2);
		w.wavy("addItem", item2, 3);
		w.wavy("addItem", item3, 2);

		var expected = [0, 0, item3, item1, item2];
		testWavy(w, expected);
});

test("test_shift_direction_left", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 5, 0, 0, 300, 0]], shiftDirection: "left" });

		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test1").addClass("test-item");
		var item3 = $("<div></div>").text("test1").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item3.appendTo(fixture);

		w.wavy("addItem", item1, 1);
		w.wavy("addItem", item2, 2);
		w.wavy("addItem", item3, 2);

		var expected = [item1, item2, item3, 0, 0];
		testWavy(w, expected);
});

test("test_modify_slots", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 5, 0, 0, 300, 300]] });
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		$(".wavy-slot", w).each(function() {
				$(this).css({ top: 0 });
		});

		w.wavy("addItem", item.clone());
		w.wavy("addItem", item.clone());
		testWavy(w, [item, item, 0, 0, 0]);
});

