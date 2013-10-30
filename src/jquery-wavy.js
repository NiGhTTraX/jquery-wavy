/**
 * Copyright (c) 2013 Andrei Picus
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


$.widget("wavy.wavy", {
		options: {
				slotClass: "wavy-slot",
				placeholderClass: "wavy-placeholder",
				shiftDirection: "closest",
				acceptOnWavy: true,
				scope: "default",
				path: "none",
		},

		_create: function() {
				this.element.addClass("wavy");

				this._pickedUp = null;
				this._getSize();
				this._createSlots();
				this._positionSlots();
				this._makeSortable();
		},

		_getSize: function() {
				var path = this.options.path;
				this._size = 0;

				if (path !== "none") {
					for (i = 0, l = path.length; i < l; i++) {
						this._size += path[i][1];
					}
				} else {
					this._size = this.options.size;
				}

				this._left = this._size;
		},

		_removeSlots: function(i) {
				if (i === undefined)
					i = 0;

				$("." + this.options.slotClass, this.element).slice(i).remove();
		},

		_destroy: function() {
				this.element.removeClass("wavy full");
				this._removeSlots();
		},

		_setOption: function(key, value) {
				switch(key) {
						case "scope":
								this._updateScope(value);
								break;
				}

				this._super(key, value);
		},

		_updateScope: function(scope) {
				$("." + this.options.slotClass, this.element).each(function() {
						$(this).droppable("option", "scope", scope);
						$(this).children().each(function() {
								$(this).draggable("option", "scope", scope);
						});
				});
		},

		_createSelector: function() {
				return ":not(." + this.options.placeholderClass + ")";
		},

		_deg2rad: function(angle) {
				return angle * Math.PI / 180;
		},

		_pathBezier: function(t, p0x, p0y, p1x, p1y, c0x, c0y, c1x, c1y) {
				t = 1 - t;

				var i = 1 - t,
						x = t * t,
						y = i * i,
						a = x * t,
						b = 3 * x * i,
						c = 3 * t * y,
						d = y * i;

				return {
						"x": a * p0x + b * c0x + c * c1x + d * p1x,
						"y": a * p0y + b * c0y + c * c1y + d * p1y
				};
		},

		_pathArc: function(t, cx, cy, radius, start, end) {
				var angle = (end - start) * t + start;

				return  {
						"x": (Math.cos(angle) * radius) + cx,
						"y": (Math.sin(angle) * radius) + cy,
						"angle": angle
				};
		},

		_pathLine: function(t, p0x, p0y, p1x, p1y) {
				return {
						"x": (p1x - p0x) * t + p0x,
						"y": (p1y - p0y) * t + p0y
				};
		},

		_createSlots: function() {
				if (this.options.path === "none")
					return;

				for (var i = 0; i < this._size; i++) {
					var slot = $("<div></div>").addClass(this.options.slotClass);
					slot.appendTo(this.element);
				}
		},

		_positionSlots: function() {
				if (this.options.path === "none")
					return;

				var that = this,
						size = this._size,
						_path = this.options.path;

				var k = 0;
				for (var i = 0, l = _path.length; i < l; i++) {
					var path = _path[i],
							pathType = path[0],
							pathSize = path[1],
							t = 0, step,
							p0x, p0y, p1x, p1y, c0x, c0y, c1x, c1y, radius, start, end, cx, cy;

					if (pathType === "bezier") {
						step = 1 / (pathSize - 1);
						p0x = path[2];
						p0y = path[3];
						p1x = path[4];
						p1y = path[5];
						c0x = path[6];
						c0y = path[7];
						c1x = path[8];
						c1y = path[9];
					} else if (pathType === "line") {
						step = 1 / (pathSize - 1);
						p0x = path[2];
						p0y = path[3];
						p1x = path[4];
						p1y = path[5];
					} else if (pathType === "arc") {
						step = 1 / pathSize;
						cx = path[2];
						cy = path[3];
						radius = path[4];
						start = this._deg2rad(path[5]);
						end = this._deg2rad(path[6]);
					} else {
						throw new Error("Unknown path type");
					}

					/* jshint -W083 */
					$("." + this.options.slotClass, this.element).slice(k, k + pathSize).each(function() {
							var ret;

							if (pathType === "bezier")
								ret = that._pathBezier(t, p0x, p0y, p1x, p1y, c0x, c0y, c1x, c1y);
							else if (pathType === "line")
								ret = that._pathLine(t, p0x, p0y, p1x, p1y);
							else if (pathType === "arc")
								ret = that._pathArc(t, cx, cy, radius, start, end);

							t += step;

							$(this).css({
									left: Math.round(ret.x) + "px",
									top: Math.round(ret.y) + "px"
							});
					});
					/* jshint +W083 */

					k += pathSize;
				}
		},

		_makeSortable: function() {
				var that = this;
				var selector = this._createSelector();

				$("." + this.options.slotClass, this.element).each(function() {
						$(this).droppable({
								scope: that.options.scope,
								greedy: true,
								over: function(e, ui) {
										// Do we have room?
										if (that._pickedUp === null && that.element.hasClass("full"))
											return;

										// Move the placeholder.
										if (that._pickedUp) {
											that._pickedUp.appendTo($(this));

											// Update the helper's index.
											ui.helper.data("index", $(this).index());
										}

										// If this is an empty slot, do nothing.
										if ($(this).children(selector).length === 0)
											return;

										/**
										* There is already an item in this slot, so we have to shift
										* some of the other items to make room.
										*/
										var i = $(this).index();
										var freeSpot = that._findFreeSpot(i);

										that._shift(i, freeSpot);

								},

								drop: function(e, ui) {
										// Do we have room?
										if (that._pickedUp === null && that.element.hasClass("full"))
											return;

										if (that._pickedUp) {
											// We were dragging an element already in the list.
											// Let the item handle itself through the stop method.
										} else {
											// This is a new element being dropped in the list.
											// Insert the dragged item into the slot.
											var item = ui.helper.clone();
											that._addItem(item, $(this));

											// Was this an element from another wavy?
											var otherWavy = ui.helper.parent();
											if (otherWavy.hasClass("wavy") &&
													otherWavy != that.element) {
												// Remove the original element.
												var index = ui.helper.data("index");
												otherWavy.wavy("removeItem", index);
											}

											// If this was our last empty slot, mark the wavy as
											// full.
											that._left -= 1;
											if (that._left === 0)
												that.element.addClass("full");
										}
								}
						});
				});

				if (this.options.acceptOnWavy === true) {
					// When dropping an element on the wavy itself, rather than on a
					// slot, insert the element in a free slot.
					this.element.droppable({
							scope: this.options.scope,
							greedy: true,
							drop: function(e, ui) {
									if (that._pickedUp)
										return;
									var item = ui.helper.clone();
									try {
										that.addItem(item);
									} catch(err) {
										// The wavy was probably full, do nothing.
									}
							}
					});
				}
		},

		_findFreeSpot: function(i) {
				var size = this._size;
				var left, right, k;
				var selector = this._createSelector();

				for (k = i + 1; k < size; k++) {
					if (!this.element.children().eq(k).children(selector).length)
						if (this.options.shiftDirection === "right") {
							return k;
						} else {
							right = k;
							break;
						}
				}

				for (k = i - 1; k >= 0; k--) {
					if (!this.element.children().eq(k).children(selector).length)
						if (this.options.shiftDirection === "left") {
							return k;
						} else {
							left = k;
							break;
						}
				}

				if (left === undefined && right === undefined) {
					// Wavy is full, somehow this function was called, even though it
					// wasn't supposed to. This is just a paranoid check.
					throw new Error("Couldn't find free spot");
				} else if (left === undefined) {
					// No free spot to the left, return right.
					return right;
				} else if (right === undefined) {
					// No free spot to the right, return left.
					return left;
				}

				// Return the closest free spot.
				if (this.options.shiftDirection === "closest") {
					return i - left < right - i ? left : right;
				} else {
					throw new Error("Unknown option for shiftDirection");
				}
		},

		_shift: function(i, j) {
				var dir, start, end, k;
				var selector = this._createSelector();

				if (i < j) {
					for (k = j; k > i; k--) {
						this.element.children().eq(k - 1).children(selector).appendTo(
								this.element.children().eq(k));
					}
				} else {
					for (k = j; k < i; k++) {
						this.element.children().eq(k + 1).children(selector).appendTo(
								this.element.children().eq(k));
					}
				}
		},

		_addItem: function(item, slot) {
					var that = this;

					item.css({ left: 0, top: 0 });
					item.draggable({
							scope: that.options.scope,
							revert: false,
							helper: "clone",
							appendTo: that.element,
							start: function(e, ui) {
									// Attach the index to the helper.
									// This is useful if you want to interact with the original
									// item when dragging outside of the wavy.
									ui.helper.data("index", $(this).parent().index());

									that._pickedUp = $(this);
									$(this).addClass(that.options.placeholderClass);
							},
							stop: function(e, ui) {
									/**
									* This method is only triggered when dragging an element that
									* is already part of the wavy, which means, the item will
									* reside in the _pickedUp variable. When this is triggered,
									* the placeholder should already be in the right position, so
									* just remove the placeholder class and clear the variable.
									*
									* In this way, the original item is moved around, and not a
									* copy of it.
									*/
									if (that._pickedUp) {
										that._pickedUp.removeClass(that.options.placeholderClass);
										that._pickedUp = null;
									}
							}
					});

					item.appendTo(slot);
		},

		addItem: function(item, index) {
				if (this.element.hasClass("full"))
					throw new Error("Wavy full");

				var slot, freeSpot;

				if (index !== undefined) {
					// Try to add the item to the given slot.
					slot = this.element.children().eq(index);

					if (slot.children().length) {
						// There's already an item in that slot, so let's shift.
						freeSpot = this._findFreeSpot(index);
						this._shift(index, freeSpot);
					}
				} else {
					// Add the item in the first free spot.
					freeSpot = this._findFreeSpot(-1);
					slot = this.element.children().eq(freeSpot);
				}

				this._addItem(item, slot);

				this._left -= 1;
				if (this._left === 0)
					this.element.addClass("full");
		},

		removeItem: function(index) {
				var slot = this.element.children().eq(index);
				var children = slot.children();

				if (children.length) {
					children.remove();
					this._left += 1;
					this.element.removeClass("full");
				}
		},

		capacity: function() {
				return this._left;
		}
});

