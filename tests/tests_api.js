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

test("test_helper_index", function() {
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

		dd(item, "#d");

		var expected = [0, item, 0, 0, 0];
		testWavy(w, expected);
});

test("test_helper_index", function() {
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

		dd(item, "#trash");

		var expected = [0, 0, 0, 0, 0];
		testWavy(w, expected);

		equal($(".test-item").length, 0);
		equal($(".wavy-placeholder").length, 0);
});

