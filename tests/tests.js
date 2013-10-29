function testWavy(wavy, items) {
	var slots = $(".wavy-slot", wavy);
	var left = 0;

	equal(slots.length, items.length, "size is correct");

	for (var i = 0, l = items.length; i < l; i++) {
		if (items[i] === 0) {
			// Test that nothing is present in this slot.
			equal(slots.eq(i).children().length, 0, "slot " + i + " is empty");
			left++;
		} else {
			// Test that the correct item has been added to this slot.
			equal(slots.eq(i).text(), items[i].text(), "slot " + i + " is correct");
		}
	}

	equal(wavy.wavy("capacity"), left, "capacity is correct");
}


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

asyncTest("test_drag_and_drop_item_without_helper_clone_retains_item", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 10, 0, 0, 300, 0]] });

		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable();

		var slot = ".wavy-slot:first";
		Syn.drag({ to: slot, duration: 100 }, item);

		setTimeout(function() {
				equal($(".test-item", fixture).length, 2);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_with_helper_clone_retains_item", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 10, 0, 0, 300, 0]] });

		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable({ helper: "clone" });

		var slot = ".wavy-slot:first";
		Syn.drag({ to: slot, duration: 100 }, item);

		setTimeout(function() {
				equal($(".test-item", fixture).length, 2);
				start();
		}, 200);
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


module("exceptions");
test("test_invalid_path", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);

		throws(function() {
				w.wavy({ path: [["invalid", 5]] });
		});
});

test("test_invalid_shift_direction", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 5, 0, 0, 300, 0]], shiftDirection: "invalid" });

		var item = $("<div></div>").text("test1").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item.clone(), 2);
		throws(function() {
				w.wavy("addItem", item, 2);
		});
});

test("test_api_wavy_full", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 1, 0, 0, 300, 0]] });

		var item = $("<div></div>").text("test");
		w.wavy("addItem", item.clone());
		throws(function() {
				w.wavy("addItem", item.clone());
		});
		var expected = [item];
		testWavy(w, expected);
});

asyncTest("test_drag_and_drop_wavy_full", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 1, 0, 0, 300, 0]] });

		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable({ helper: "clone" });

		var slot = ".wavy-slot:first";
		Syn.drag({ to: slot, duration: 100 }, item);
		setTimeout(function() {
				Syn.drag({ to: slot, duration: 100 }, item);
		}, 200);

		setTimeout(function() {
				testWavy(w, [item]);
				start();
		}, 400);
});

module("api", {
		setup: function() {
				var fixture = $("#qunit-fixture");
				var w = $("<div></div>");
				w.appendTo(fixture);
				w.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
		}
});
test("test_add_item_without_index", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item.clone());
		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_add_item_with_index", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item.clone(), 0);
		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_add_item_fill_wavy_without_index", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		for (var i = 0; i < 5; i++) {
			w.wavy("addItem", item.clone());
		}
		var expected = [item, item, item, item, item];
		testWavy(w, expected);
		ok(w.hasClass("full"));
});

test("test_add_item_fill_wavy_with_index", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		for (var i = 0; i < 5; i++) {
			w.wavy("addItem", item.clone(), i);
		}
		var expected = [item, item, item, item, item];
		testWavy(w, expected);
		ok(w.hasClass("full"));
});

test("test_add_item_with_index_in_occupied_first_slot", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item.clone(), 0);
		w.wavy("addItem", item.clone(), 0);
		var expected = [item, item, 0, 0, 0];
		testWavy(w, expected);
});

test("test_add_item_with_index_in_occupied_last_slot", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item.clone(), 4);
		w.wavy("addItem", item.clone(), 4);
		var expected = [0, 0, 0, item, item];
		testWavy(w, expected);
});

test("test_remove_item", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item.clone(), 0);
		w.wavy("removeItem", 0);
		var expected = [0, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_remove_nonexistent_item", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("removeItem", 0);
		var expected = [0, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_add_item_fill_wavy_and_then_remove_all", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		for (var i = 0; i < 5; i++) {
				w.wavy("addItem", item.clone(), i);
				w.wavy("removeItem", i);
		}
		var expected = [0, 0, 0, 0, 0];
		testWavy(w, expected);
		ok(!w.hasClass("full"));
});

test("test_add_item_fill_wavy_and_then_remove_all_and_add_again", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		var i;
		for (i = 0; i < 5; i++) {
				w.wavy("addItem", item.clone(), i);
		}
		for (i = 0; i < 5; i++) {
				w.wavy("removeItem", i);
		}
		for (i = 0; i < 5; i++) {
				w.wavy("addItem", item.clone(), i);
		}
		var expected = [item, item, item, item, item];
		testWavy(w, expected);
		ok(w.hasClass("full"));
});

asyncTest("test_helper_index", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 1);

		var d = $("<div></div>").attr("id", "d");
		d.droppable({
				drop: function(e, ui) {
						// Get the index from the helper.
						var index = ui.helper.data("index");
						equal(index, 1);
				}
		});
		d.css({ position: "absolute", left: 0, top: "400px" });
		d.appendTo(fixture);

		Syn.drag({ to: "#d", duration: 100 }, item);

		setTimeout(function() {
			var expected = [0, item, 0, 0, 0];
			testWavy(w, expected);
			start();
		}, 200);
});

asyncTest("test_helper_index", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 1);

		var trash = $("<div></div>").text("trash").attr("id", "trash");
		trash.droppable({
				drop: function(e, ui) {
						// Get the index from the helper.
						var index = ui.helper.data("index");

						equal(index, 1);

						// Remove the original item.
						w.wavy("removeItem", index);

						// Remove the helper.
						ui.helper.remove();
				}
		});
		trash.css({ position: "absolute", left: 0, top: "400px" });
		trash.appendTo(fixture);

		Syn.drag({ to: "#trash", duration: 100 }, item);

		setTimeout(function() {
			var expected = [0, 0, 0, 0, 0];
			testWavy(w, expected);

			equal($(".test-item").length, 0);
			equal($(".wavy-placeholder").length, 0);
			start();
		}, 200);
});


module("drag_and_drop", {
		setup: function() {
				var fixture = $("#qunit-fixture");
				var w = $("<div></div>");
				w.appendTo(fixture);
				w.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
		}
});
asyncTest("test_drag_and_drop_item_to_first_slot", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable();

		var slot = ".wavy-slot:first";

		Syn.drag({ to: slot, duration: 100 }, item);
		setTimeout(function() {
				var expected = [item, 0, 0, 0, 0];
				testWavy(w, expected);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_to_last_slot", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable();

		var slot = ".wavy-slot:last";

		Syn.drag({ to: slot, duration: 10 }, item);
		setTimeout(function() {
				var expected = [0, 0, 0, 0, item];
				testWavy(w, expected);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_to_occupied_first_slot", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test2").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item1.draggable({ helper: "clone" });
		item2.draggable({ helper: "clone" });

		var slot = ".wavy-slot:first";

		Syn.drag({ to: slot, duration: 100 }, item1);

		setTimeout(function() {
				Syn.drag({ to: slot, duration: 100 }, item2);
		}, 200);

		setTimeout(function() {
				var expected = [item2, item1, 0, 0, 0];
				testWavy(w, expected);
				start();
		}, 400);
});

asyncTest("test_drag_and_drop_item_to_occupied_last_slot", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test2").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item1.draggable({ helper: "clone" });
		item2.draggable({ helper: "clone" });

		var slot = ".wavy-slot:last";

		Syn.drag({ to: slot, duration: 100 }, item1);

		setTimeout(function() {
				Syn.drag({ to: slot, duration: 100 }, item2);
		}, 200);

		setTimeout(function() {
				var expected = [0, 0, 0, item1, item2];
				testWavy(w, expected);
				start();
		}, 400);
});

asyncTest("test_drag_and_drop_full_wavy", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test2").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);

		w.wavy("addItem", item1.clone(), 0);
		w.wavy("addItem", item2.clone(), 1);
		w.wavy("addItem", item1.clone(), 2);
		w.wavy("addItem", item2, 3);
		w.wavy("addItem", item1, 4);

		var from = ".test-item:last";
		var to = ".wavy-slot:first";
		Syn.drag({ to: to, duration: 100 }, item1);

		setTimeout(function() {
				var expected = [item1, item1, item2, item1, item2];
				testWavy(w, expected);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_to_wavy_itself", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable({ helper: "clone" });

		Syn.drag({ to: ".wavy", duration: 100 }, item);

		setTimeout(function() {
				var expected = [item, 0, 0, 0, 0];
				testWavy(w, expected);
				start();
		}, 200);
});


module("drag_and_drop", {
		setup: function() {
				var fixture = $("#qunit-fixture");
				var w = $("<div></div>");
				w.appendTo(fixture);
				w.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
		}
});
asyncTest("test_drag_and_drop_item_in_wavy_from_first_to_last_slot", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item, 0);

		Syn.drag({ to: ".wavy-slot:last", duration: 100 }, item);

		setTimeout(function() {
				var expected = [0, 0, 0, 0, item];
				testWavy(w, expected);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_in_wavy_from_last_to_first", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item, 4);

		Syn.drag({ to: ".wavy-slot:first", duration: 100 }, item);

		setTimeout(function() {
				var expected = [item, 0, 0, 0, 0];
				testWavy(w, expected);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_in_wavy_back_and_forth", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item, 0);

		Syn.drag({ to: ".wavy-slot:last", duration: 100 }, item);

		setTimeout(function() {
				Syn.drag({ to: ".wavy-slot:first", duration: 100 }, item);
		}, 200);

		setTimeout(function() {
				var expected = [item, 0, 0, 0, 0];
				testWavy(w, expected);
				start();
		}, 400);
});

asyncTest("test_drag_item_in_wavy_and_drop_on_wavy", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);

		w.wavy("addItem", item, 0);

		Syn.drag({ to: ".wavy", duration: 100 }, item);

		setTimeout(function() {
				var expected = [item, 0, 0, 0, 0];
				testWavy(w, expected);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_in_wavy_that_shifts_others", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item1 = $("<div></div>").text("test1").addClass("test-item");
		var item2 = $("<div></div>").text("test2").addClass("test-item");
		var item3 = $("<div></div>").text("test3").addClass("test-item");
		item1.appendTo(fixture);
		item2.appendTo(fixture);
		item3.appendTo(fixture);

		w.wavy("addItem", item1, 0);
		w.wavy("addItem", item2, 1);
		w.wavy("addItem", item3, 2);

		Syn.drag({ to: ".wavy-slot:first", duration: 100 }, item3);

		setTimeout(function() {
				var expected = [item3, item1, item2, 0, 0];
				testWavy(w, expected);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_outside_wavy", function() {
		var fixture = $("#qunit-fixture");
		var w = $(".wavy", fixture);
		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 0);

		Syn.drag({ to: "500x500", duration: 100 }, item);

		setTimeout(function() {
				var expected = [item, 0, 0, 0, 0];
				testWavy(w, expected);
				start();
		}, 200);
});


module("more_wavys", {
		setup: function() {
				var fixture = $("#qunit-fixture");
				var w1 = $("<div></div>").attr("id", "w1").appendTo(fixture);
				var w2 = $("<div></div>").attr("id", "w2").appendTo(fixture);
				w1.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
				w2.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
		}
});
asyncTest("test_drag_and_drop_item_between_wavys", function() {
		var fixture = $("#qunit-fixture");
		var w1 = $("#w1"),
				w2 = $("#w2");
		var item = $("<div></div>").attr("id", "i1").text("test1").addClass("test-item");
		w1.wavy("addItem", item, 0);

		Syn.drag({ to: "#w2 .wavy-slot:first", duration: 100 }, item);

		setTimeout(function() {
				testWavy(w1, [0, 0, 0, 0, 0]);
				testWavy(w2, [item, 0, 0, 0, 0]);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_between_wavys_with_scopes", function() {
		var fixture = $("#qunit-fixture");
		var w1 = $("#w1"),
				w2 = $("#w2");

		w1.wavy("option", "scope", "w1");
		w2.wavy("option", "scope", "w2");

		var i1 = $("<div></div>").attr("id", "i1").text("test1").addClass("test-item");
		var i2 = $("<div></div>").attr("id", "i1").text("test1").addClass("test-item");
		w1.wavy("addItem", i1, 0);
		w2.wavy("addItem", i2, 0);

		Syn.drag({ to: "#w2 .wavy-slot:first", duration: 100 }, i1);

		setTimeout(function() {
				testWavy(w1, [i1, 0, 0, 0, 0]);
				testWavy(w2, [i2, 0, 0, 0, 0]);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_between_wavys_with_shifting", function() {
		var fixture = $("#qunit-fixture");
		var w1 = $("#w1"),
				w2 = $("#w2");

		var i1 = $("<div></div>").attr("id", "i1").text("test1").addClass("test-item");
		var i2 = $("<div></div>").attr("id", "i1").text("test1").addClass("test-item");
		w1.wavy("addItem", i1, 0);
		w2.wavy("addItem", i2, 0);

		Syn.drag({ to: "#w2 .wavy-slot:first", duration: 100 }, i1);

		setTimeout(function() {
				testWavy(w1, [0, 0, 0, 0, 0]);
				testWavy(w2, [i1, i2, 0, 0, 0]);
				start();
		}, 200);
});

asyncTest("test_drag_and_drop_item_between_wavys_back_and_forth", function() {
		var fixture = $("#qunit-fixture");
		var w1 = $("#w1"),
				w2 = $("#w2");
		var item = $("<div></div>").attr("id", "i1").text("test1").addClass("test-item");
		w1.wavy("addItem", item, 0);

		Syn.drag({ to: "#w2 .wavy-slot:first", duration: 100 }, item);
		setTimeout(function() {
				item = $(".test-item");
				Syn.drag({ to: "#w1 .wavy-slot:first", duration: 100 }, item);
		}, 200);

		setTimeout(function() {
				testWavy(w1, [item, 0, 0, 0, 0]);
				testWavy(w2, [0, 0, 0, 0, 0]);
				start();
		}, 400);
});

asyncTest("test_drag_and_drop_item_from_wavy_to_full_wavy", function() {
		var fixture = $("#qunit-fixture");
		var w1 = $("#w1"),
				w2 = $("#w2");
		var i1 = $("<div></div>").attr("id", "i1").text("test1").addClass("test-item");
		var i2 = $("<div></div>").attr("id", "i1").text("test1").addClass("test-item");
		w1.wavy("addItem", i1, 0);

		for (var i = 0; i < 5; i++) {
			w2.wavy("addItem", i2.clone(), i);
		}

		Syn.drag({ to: "#w2 .wavy-slot:first", duration: 100 }, i1);

		setTimeout(function() {
				testWavy(w1, [i1, 0, 0, 0, 0]);
				testWavy(w2, [i2, i2, i2, i2, i2]);
				start();
		}, 200);
});

