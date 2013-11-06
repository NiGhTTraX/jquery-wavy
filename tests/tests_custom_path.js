module("custom_path");
test("test_custom_slots", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);

		var slot1 = $("<div></div>").addClass("wavy-slot"),
				slot2 = $("<div></div>").addClass("wavy-slot");

		slot1.css({ left: "10px", top: "23px" });
		slot1.appendTo(w);

		slot2.css({ left: "42px", top: "99px" });
		slot2.appendTo(w);

		w.wavy();

		equal(slot1.css("left"), "10px");
		equal(slot1.css("top"), "23px");
		equal(slot2.css("left"), "42px");
		equal(slot2.css("top"), "99px");
		equal(slot1.droppable("option", "disabled"), false);
		equal(slot2.droppable("option", "disabled"), false);
		equal(w.wavy("capacity"), 2);
});

test("test_custom_slots_with_pre_existing_items", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);

		var slot1 = $("<div></div>").addClass("wavy-slot"),
				slot2 = $("<div></div>").addClass("wavy-slot"),
				item1 = $("<div></div>").text("test1").addClass("test-item"),
				item2 = $("<div></div>").text("test2").addClass("test-item");

		slot1.css({ left: "10px", top: "23px" });
		slot1.appendTo(w);

		slot2.css({ left: "42px", top: "99px" });
		slot2.appendTo(w);

		item1.appendTo(slot1);
		item2.appendTo(slot2);

		w.wavy();

		equal(item1.draggable("option", "disabled"), false);
		equal(item2.draggable("option", "disabled"), false);
});

test("test_custom_slots_with_pre_existing_items_drag_and_drop", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);

		var slot1 = $("<div></div>").addClass("wavy-slot"),
				slot2 = $("<div></div>").addClass("wavy-slot"),
				item1 = $("<div></div>").text("test1").addClass("test-item"),
				item2 = $("<div></div>").text("test2").addClass("test-item");

		slot1.css({ left: "10px", top: "23px" });
		slot1.appendTo(w);

		slot2.css({ left: "42px", top: "99px" });
		slot2.appendTo(w);

		item1.appendTo(slot1);
		item2.appendTo(slot2);

		w.wavy();

		dd(item1, item2);
		testWavy(w, [item2, item1]);
});

