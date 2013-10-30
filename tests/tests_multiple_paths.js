test("test_create_multiple_paths", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				path: [
						["line", 5, 0, 0, 300, 300],
						["line", 5, 350, 300, 350, 0]
				]
		});

		equal($(".wavy-slot", w).length, 10);

		var expectedX = [0, 75, 150, 225, 300, 350, 350, 350, 350, 350],
				expectedY = [0, 75, 150, 225, 300, 300, 225, 150, 75, 0],
				i = 0;

		$(".wavy-slot", w).each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
				i++;
		});

		equal(w.wavy("capacity"), 10);
});

test("test_drag_between_multiple_paths_first_to_last", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				path: [
						["line", 5, 0, 0, 300, 300],
						["line", 5, 350, 300, 350, 0]
				]
		});

		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item);

		dd(item, $(".wavy-slot:last", w));

		testWavy(w, [0, 0, 0, 0, 0, 0, 0, 0, 0, item]);
});

test("test_drag_between_multiple_paths_last_to_first", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				path: [
						["line", 5, 0, 0, 300, 300],
						["line", 5, 350, 300, 350, 0]
				]
		});

		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 9);

		dd(item, $(".wavy-slot:first", w));

		testWavy(w, [item, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
});

test("test_drag_between_multiple_paths_first_to_first_of_2nd_path", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				path: [
						["line", 5, 0, 0, 300, 300],
						["line", 5, 350, 300, 350, 0]
				]
		});

		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item);

		dd(item, $(".wavy-slot:eq(5)", w));

		testWavy(w, [0, 0, 0, 0, 0, item, 0, 0, 0, 0]);
});

test("test_drag_between_multiple_paths_last_to_first_of_2nd_path", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				path: [
						["line", 5, 0, 0, 300, 300],
						["line", 5, 350, 300, 350, 0]
				]
		});

		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 9);

		dd(item, $(".wavy-slot:eq(5)", w));

		testWavy(w, [0, 0, 0, 0, 0, item, 0, 0, 0, 0]);
});

test("test_drag_between_multiple_paths_last_of_1st_path_to_first_of_2nd_path", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				path: [
						["line", 5, 0, 0, 300, 300],
						["line", 5, 350, 300, 350, 0]
				]
		});

		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 4);

		dd(item, $(".wavy-slot:eq(5)", w));

		testWavy(w, [0, 0, 0, 0, 0, item, 0, 0, 0, 0]);
});

test("test_drag_between_multiple_paths_last_of_1st_path_to_last_of_2nd_path", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				path: [
						["line", 5, 0, 0, 300, 300],
						["line", 5, 350, 300, 350, 0]
				]
		});

		var item = $("<div></div>").text("test").addClass("test-item");
		w.wavy("addItem", item, 4);

		dd(item, $(".wavy-slot:last", w));

		testWavy(w, [0, 0, 0, 0, 0, 0, 0, 0, 0, item]);
});

