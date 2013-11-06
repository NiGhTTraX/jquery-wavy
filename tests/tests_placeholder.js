module("drag_and_drop", {
		setup: function() {
				var fixture = $("#qunit-fixture"),
						w = $("<div></div>");
				w.appendTo(fixture);
				w.wavy({ path: [["line", 5, 0, 0, 300, 0]] });
		}
});
test("test_placeholder_when_picking_up_item", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 0);

		dd(item, $(".wavy-slot:first", w));
		var expected = [item, 0, 0, 0, 0];
		testWavy(w, expected);
});

