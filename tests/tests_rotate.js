function getTransformMatrix(el) {
	var st = window.getComputedStyle(el, null),
			matrix = st.getPropertyValue("-webkit-transform") ||
					st.getPropertyValue("-moz-transform") ||
					st.getPropertyValue("-ms-transform") ||
					st.getPropertyValue("-o-transform") ||
					st.getPropertyValue("transform") ||
					null;

	if (matrix === null)
		ok(1 == 2);

	return matrix.split('(')[1].split(')')[0].split(',');
}

function getAngle(m) {
	var angle = Math.atan2(m[1], m[0]);
	if (angle < 0)
		angle += 2 * Math.PI;

	return angle.toFixed(2);
}


module("rotate");
test("test_rotate_line", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				rotate: true,
				path: [["line", 5, 0, 0, 300, 300]]
		});

		var expected = Math.PI / 4;
		$(".wavy-slot", w).each(function(i) {
				var m = getTransformMatrix(this);
				equal(getAngle(m), expected.toFixed(2), i);
		});
});

test("test_rotate_arc", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				rotate: true,
				path: [["arc", 8, 150, 150, 150, 0, 360]]
		});

		$(".wavy-slot", w).each(function(i) {
				var m = getTransformMatrix(this),
						expected = Math.PI / 4 * i;
				equal(getAngle(m), expected.toFixed(2), i);
		});
});

test("test_rotate_bezier", function() {
		var fixture = $("#qunit-fixture");
		var w = $("<div></div>");
		w.appendTo(fixture);
		w.wavy({
				rotate: true,
				path: [["bezier", 5, 0, 0, 300, 300, 50, 250, 250, 50]]
		});

		var expected = [1.37, 0.65, 0.2, 0.65, 1.37];
		$(".wavy-slot", w).each(function(i) {
				var m = getTransformMatrix(this);
				equal(getAngle(m), expected[i].toFixed(2), i);
		});
});

