module("options", {
		setup: function() {
				var fixture = $("#qunit-fixture");
				var w = $("<div></div>").attr("id", "w");
				w.appendTo(fixture);
				w.wavy({ path: [["line", 5, 0, 0, 300, 300]] });
		}
});
test("test_option_scope", function() {
		var fixture = $("#qunit-fixture"),
				w = $("#w"),
				item = $("<div></div>").text("test").addClass("test-item"),
				scope = "test";
		w.wavy("addItem", item);

		w.wavy("option", "scope", scope);

		$(".wavys-slot", w).each(function() {
				equal($(this).droppable("option", "scope"), scope);
		});
		equal(item.draggable("option", "scope"), scope);
		equal(w.droppable("option", "scope"), scope);
});

test("test_option_shiftDirection", function() {
		var fixture = $("#qunit-fixture"),
				w = $("#w"),
				i1 = $("<div></div>").text("test1").addClass("test-item"),
				i2 = $("<div></div>").text("test2").addClass("test-item"),
				i3 = $("<div></div>").text("test3").addClass("test-item");

		w.wavy("addItem", i1, 2);
		w.wavy("option", "shiftDirection", "left");
		w.wavy("addItem", i2, 2);
		w.wavy("option", "shiftDirection", "right");
		w.wavy("addItem", i3, 2);

		testWavy(w, [0, i1, i3, i2, 0]);
});

