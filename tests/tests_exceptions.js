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

test("test_drag_and_drop_wavy_full", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({ path: [["line", 1, 0, 0, 300, 0]] });

		var item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable({ helper: "clone" });

		dd(item, $(".wavy-slot:first", w));
		dd(item, $(".wavy-slot:first", w));

		testWavy(w, [item]);
});

