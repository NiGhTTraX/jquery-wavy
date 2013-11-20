/* jslint unused: false */
function testWavy(wavy, items) {
	var slots = $(".wavy-slot", wavy);
	var left = 0;

	equal(slots.length, items.length, "size is correct");

	for (var i = 0, l = items.length; i < l; i++) {
		var slot = slots.eq(i);
		if (items[i] === 0) {
			// Test that nothing is present in this slot.
			equal(slot.children().length, 0, "slot " + i + " is empty");
			left++;
		} else {
			// Test that the correct item has been added to this slot.
			equal(slot.children().length, 1, "slot " + i + " has 1 child");
			ok(slot.children().hasClass("test-item"), "child is an item");
			equal(slot.text(), items[i].text(), "slot " + i + " is correct");
		}
	}

	equal(wavy.wavy("capacity"), left, "capacity is correct");
}

function dd(from, to) {
	// Drag and drop from -> to.
	var fromOffset = findCenter($(from)),
			toOffset = findCenter($(to)),
			dx = toOffset.clientX - fromOffset.clientX,
			dy = toOffset.clientY - fromOffset.clientY;

	$(from).simulate("drag", {dx: dx, dy: dy});
}

function findCenter(elem) {
	var offset,
			document = $(elem[0].ownerDocument);
	offset = elem.offset();

	return {
			clientX: offset.left + elem.outerWidth() / 2 - document.scrollLeft(),
			clientY: offset.top + elem.outerHeight() / 2 - document.scrollTop()
	};
}
/* jslint unused: true */

