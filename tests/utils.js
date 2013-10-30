function testWavy(wavy, items) {
	var slots = $(".wavy-slot", wavy);
	var left = 0;

	equal(slots.length, items.length, "size is correct");

	for (var i = 0, l = items.length; i < l; i++) {
		if (items[i] === 0) {
			// Test that nothing is present in this slot.
			equal(slots.eq(i).children().length, 0, "slot " + i + " is empty");
			left++;
		} else {
			// Test that the correct item has been added to this slot.
			equal(slots.eq(i).text(), items[i].text(), "slot " + i + " is correct");
		}
	}

	equal(wavy.wavy("capacity"), left, "capacity is correct");
}

function dd(from, to) {
	// Drag and drop from -> to.
	var fromOffset = $(from).offset(),
			toOffset = $(to).offset(),
			dx = toOffset.left - fromOffset.left,
			dy = toOffset.top - fromOffset.top;

	$(from).simulate("drag", {dx: dx, dy: dy});
}

