module("paths");
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

