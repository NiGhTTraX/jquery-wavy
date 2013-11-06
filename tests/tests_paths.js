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

test("test_path_with_offset_20_20", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.css({
				position: "absolute",
				left: "20px",
				top: "20px"
		});
		w.appendTo(fixture);
		w.wavy({
				offset: true,
				path: [["line", 5, 0, 0, 300, 300]]
		});

		var expectedX = [-20, 55, 130, 205, 280];
		var expectedY = [-20, 55, 130, 205, 280];
		$(".wavy-slot", w).each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
		});
});

test("test_path_with_offset_0_0", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				offset: true,
				path: [["line", 5, 0, 0, 300, 300]]
		});

		var expectedX = [0, 75, 150, 225, 300];
		var expectedY = [0, 75, 150, 225, 300];
		$(".wavy-slot", w).each(function(i) {
				equal($(this).css("left"), expectedX[i] + "px");
				equal($(this).css("top"), expectedY[i] + "px");
		});
});

