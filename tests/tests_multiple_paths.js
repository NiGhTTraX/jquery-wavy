module("multiple_paths", {
		setup: function() {
				var fixture = $("#qunit-fixture"),
						w = $("<div></div>").attr("id", "w");
				w.appendTo(fixture);
				w.wavy({
						path: [
								["line", 5, 0, 0, 300, 300],
								["line", 5, 350, 300, 350, 0]
						]
				});
		}
});
test("test_create_multiple_paths", function() {
		var w = $("#w");
		equal($(".wavy-slot", w).length, 10);

		var expectedX = [0, 75, 150, 225, 300, 350, 350, 350, 350, 350],
				expectedY = [0, 75, 150, 225, 300, 300, 225, 150, 75, 0];

		$(".wavy-slot", w).each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
				i++;
		});

		equal(w.wavy("capacity"), 10);
});

test("test_drag_between_multiple_paths_first_to_last", function() {
		var w = $("#w"),
				item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item);

		dd(item, $(".wavy-slot:last", w));

		var expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, item];
		testWavy(w, expected);
});

test("test_drag_between_multiple_paths_last_to_first", function() {
		var w = $("#w"),
				item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 9);

		dd(item, $(".wavy-slot:first", w));

		var expected = [item, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_between_multiple_paths_first_to_first_of_2nd_path", function() {
		var w = $("#w"),
				item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item);

		dd(item, $(".wavy-slot:eq(5)", w));

		var expected = [0, 0, 0, 0, 0, item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_between_multiple_paths_last_to_first_of_2nd_path", function() {
		var w = $("#w"),
				item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 9);

		dd(item, $(".wavy-slot:eq(5)", w));

		var expected = [0, 0, 0, 0, 0, item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_between_multiple_paths_last_of_1st_path_to_first_of_2nd_path", function() {
		var w = $("#w"),
				item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 4);

		dd(item, $(".wavy-slot:eq(5)", w));

		var expected = [0, 0, 0, 0, 0, item, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_drag_between_multiple_paths_last_of_1st_path_to_last_of_2nd_path", function() {
		var w = $("#w"),
				item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 4);

		dd(item, $(".wavy-slot:last", w));

		var expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, item];
		testWavy(w, expected);
});

test("test_add_item_shifting_into_2nd_path", function() {
		var w = $("#w"),
				i1 = $("<div></div>").text("test1").addClass("test-item"),
				i2 = $("<div></div>").text("test2").addClass("test-item");
		w.wavy("addItem", i1, 4);
		w.wavy("addItem", i2, 4);

		var expected = [0, 0, 0, 0, i2, i1, 0, 0, 0, 0];
		testWavy(w, expected);
});

test("test_add_item_shifting_from_2nd_path", function() {
		var w = $("#w"),
				i1 = $("<div></div>").text("test1").addClass("test-item"),
				i2 = $("<div></div>").text("test2").addClass("test-item");
		w.wavy("option", "shiftDirection", "left");
		w.wavy("addItem", i1, 5);
		w.wavy("addItem", i2, 5);

		var expected = [0, 0, 0, 0, i1, i2, 0, 0, 0, 0];
		testWavy(w, expected);
});

