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

		var coords = findCenter(item);

		item.simulate("mousedown", coords);
		coords.clientX += 5;
		coords.clientY += 50;
		$(document).simulate("mousemove", coords);

		var slot = $(".wavy-slot:first", w);
		equal(slot.children().length, 1);
		ok($(":first-child", slot).hasClass("wavy-placeholder"));

		item.simulate("mouseup", coords);
		item.simulate("click", coords);

		equal(slot.children().length, 1);
		ok((".wavy-placeholder").length, 0);
});

test("test_placeholder_when_dragging_new_item", function() {
		var fixture = $("#qunit-fixture"),
				w = $(".wavy", fixture),
				item = $("<div></div>").text("test").addClass("test-item");
		item.appendTo(fixture);
		item.draggable();

		var coords = findCenter(item),
				slot = $(".wavy-slot:first", w);

		item.simulate("mousedown", coords);

		coords = findCenter(slot);
		$(document).simulate("mousemove", coords);

		equal(slot.children().length, 1);
		ok($(":first-child", slot).hasClass("wavy-placeholder"));

		item.simulate("mouseup", coords);
		item.simulate("click", coords);

		equal(slot.children().length, 1);
		ok((".wavy-placeholder").length, 0);
});

