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
				path: null,
				offset: false,
				rotate: false,
		},

		_create: function() {
				this.element.addClass("wavy");

				this._getSize();
				this._createSlots();
				this._positionSlots();
				this._makeSortable();
				if (this.options.acceptOnWavy === true) {
					this._makeWavyDroppable();
				}
		},

		_getSize: function() {
				// TODO: refactor?
				var path = this.options.path;
				this._size = 0;

				if (path !== null) {
					for (var i = 0, l = path.length; i < l; i++) {
						this._size += path[i][1];
					}
				} else {
					this.refresh();
				}

				this._capacity = this._size;
		},

		_createSlots: function() {
				if (this.options.path === null)
					return;

				for (var i = 0; i < this._size; i++) {
					var slot = $("<div></div>").addClass(this.options.slotClass);
					slot.appendTo(this.element);
				}
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

				if (this.options.acceptOnWavy) {
					this.element.droppable("option", "scope", scope);
				}
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
						d = y * i,
						tx = x * (c0x - p0x) + 2 * i * t * (c1x - c0x) + y * (p1x - c1x),
						ty = x * (c0y - p0y) + 2 * i * t * (c1y - c0y) + y * (p1y - c1y);

				return {
						"x": a * p0x + b * c0x + c * c1x + d * p1x,
						"y": a * p0y + b * c0y + c * c1y + d * p1y,
						"angle": Math.atan2(ty, tx)
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
						"y": (p1y - p0y) * t + p0y,
						"angle": Math.atan2(p1y - p0y, p1x - p0x)
				};
		},

		_positionSlots: function() {
				if (this.options.path === null)
					return;

				var that = this,
						_path = this.options.path;

				var k = 0;
				for (var i = 0, l = _path.length; i < l; i++) {
					var path = _path[i],
							pathType = path[0],
							pathSize = path[1],
							t = 0, step,
							offsetX = 0, offsetY = 0, offset,
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

					if (this.options.offset === true) {
						// Coordinates are against the parent, calculate offsets.
						offset = this.element.position();
						offsetX = offset.left;
						offsetY = offset.top;
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
									left: Math.round(ret.x) - offsetX + "px",
									top: Math.round(ret.y) - offsetY + "px"
							});

							if (that.options.rotate === true)
								$(this).css("transform", "rotate(" + ret.angle.toFixed(2) + "rad)");
					});
					/* jshint +W083 */

					k += pathSize;
				}
		},

		_makeSortable: function() {
				var that = this,
						$wm = $.wavy.wmanager,
						selector = this._createSelector();

				$("." + this.options.slotClass, this.element).each(function() {
						$(this).droppable({
								scope: that.options.scope,
								greedy: true,
								over: function(e, ui) {
										/**
										 * If we're dragging a new item in, meaning that $wm.current
										 * is anything other than us, and we're full, do nothing.
										 */
										if ($wm.current !== that && that._capacity === 0)
											return;

										/**
										 * If we moved from another wavy, then we can assume 2
										 * things:
										 * - $wm.current will hold the wavy instance
										 * - $wm.placeholder will hold the current position, in the
										 *   other wavy, of the item we're moving.
										 *
										 * When moving an item between wavys, we must inform the
										 * other wavy to free up the item's slot. The helper will
										 * remain in the old Wavy.
										 */
										if ($wm.current && $wm.current !== that) {
											$wm.placeholder.appendTo($(this));

											$wm.current.refresh();

											// We're now treating the item as being part of our Wavy,
											// so update the capacity.
											that._capacity -= 1;
										}

										// We're the current Wavy now.
										$wm.current = that;

										// Is this a new element being dragged over?
										if (!$wm.placeholder) {
											$wm.placeholder = ui.helper.clone();
											$wm.placeholder.css({ left: 0, top: 0});
											$wm.placeholder.addClass(that.options.placeholderClass);

											that._capacity -= 1;

											/**
											 * Since this is a new item, we have to listen to its
											 * dragstop event and remove the placeholder when the item
											 * is not dropped on a wavy.
											 *
											 * The current implementation of draggables and droppables
											 * will fire the drop event before the dragstop event.
											 */
											$(ui.draggable).on("dragstop", function() {
													if ($wm.placeholder) {
														$wm.placeholder.remove();
														$wm.placeholder = null;
														$wm.current.refresh();
													}

													$wm.current = null;
											});
										} else {
											// Update the helper's index.
											ui.helper.data("index", $(this).index());
										}

										// TODO: stop using children
										if ($(this).children(selector).length !== 0) {
											/**
											* There is already an item in this slot, so we have to
											* shift some of the other items to make room.
											*/
											var i = $(this).index(),
													freeSpot = that._findFreeSpot(i);
											that._shift(i, freeSpot);
										}

										// Move the placeholder.
										$wm.placeholder.appendTo($(this));

										if (that._capacity === 0)
											that.element.addClass("full");
								},

								drop: function() {
										// Do we have room?
										if (that._capacity === 0) {
											$wm.current = null;
											$wm.placeholder = null;
											return;
										}

										$wm.placeholder.removeClass(that.options.placeholderClass);

										$wm.current = null;
										$wm.placeholder = null;
								}
						});

						// Initialize any pre-existing items.
						// TODO: check if more than 1 child
						$(this).children().each(function() {
								that._capacity -= 1;
								that._makeItemDraggable($(this));
						});
				});
		},

		_makeWavyDroppable: function() {
				var that = this,
						$wm = $.wavy.wmanager;

				// When dropping an element on the wavy itself, rather than on a
				// slot, insert the element in a free slot.
				this.element.droppable({
						scope: this.options.scope,
						greedy: true,
						drop: function(e, ui) {
								// Do we have room?
								if (that._capacity === 0)
									return;

								if ($wm.current === that) {
									$wm.placeholder.removeClass(that.options.placeholderClass);
									that._makeItemDraggable($wm.placeholder);
									$wm.placeholder = null;
								} else {
									if ($wm.placeholder) {
										$wm.placeholder.remove();
										$wm.placeholder = null;
										$wm.current.refresh();
									}
									that.addItem(ui.helper.clone());
								}

								$wm.current = null;
						}
				});
		},

		_makeItemDraggable: function(item) {
				var that = this,
						$wm = $.wavy.wmanager;

				item.css({ left: 0, top: 0 });

				/* TODO: destroy previous draggable, if any?
				if (item.hasClass("ui-draggable"))
					item.draggable("destroy");
					*/

				item.draggable({
						scope: that.options.scope,
						revert: false, // TODO: make it an option
						helper: "clone",
						appendTo: that.element,
						start: function(e, ui) {
								// Attach the index to the helper.
								// This is useful if you want to interact with the original
								// item when dragging outside of the wavy.
								ui.helper.data("index", $(this).parent().index());

								// The placeholder is the element itself.
								$(this).addClass(that.options.placeholderClass);
								$wm.placeholder = $(this);
								$wm.current = that;
						},

						stop: function() {
								if ($wm.placeholder) {
									$wm.placeholder.removeClass(that.options.placeholderClass);
									$wm.placeholder = null;
									$wm.current = null;
								}
						}
				});
		},

		_findFreeSpot: function(i) {
				var size = this._size;
				var left, right, k;
				var selector = this._createSelector();

				for (k = i + 1; k < size; k++) {
					// TODO: stop using children
					if (!this.element.children().eq(k).children(selector).length)
						if (this.options.shiftDirection === "right") {
							return k;
						} else {
							right = k;
							break;
						}
				}

				for (k = i - 1; k >= 0; k--) {
					// TODO: stop using children
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
				var k,
						selector = this._createSelector();

				if (i < j) {
					for (k = j; k > i; k--) {
						// TODO: stop using children
						this.element.children().eq(k - 1).children(selector).appendTo(
								this.element.children().eq(k));
					}
				} else {
					for (k = j; k < i; k++) {
						// TODO: stop using children
						this.element.children().eq(k + 1).children(selector).appendTo(
								this.element.children().eq(k));
					}
				}
		},

		_addItem: function(item, slot) {
				this._makeItemDraggable(item);
				item.appendTo(slot);
		},

		addItem: function(item, index) {
				if (this._capacity === 0)
					throw new Error("Wavy full");

				var slot, freeSpot;

				if (index !== undefined) {
					// Try to add the item to the given slot.
					slot = this.element.children().eq(index);

					// TODO: stop using children
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

				this._capacity -= 1;
				if (this._capacity === 0)
					this.element.addClass("full");
		},

		removeItem: function(index) {
				var slot = this.element.children().eq(index),
						children = slot.children();

				// TODO: stop using children
				if (children.length) {
					children.remove();
					this._capacity += 1; // TODO: check this
					this.element.removeClass("full");
				}
		},

		capacity: function() {
				return this._capacity;
		},

		refresh: function() {
				var slots = $("." + this.options.slotClass, this.element);

				this._size = this._capacity = slots.length;

				slots.each(function() {
						// TODO: stop using children
						if ($(this).children().length)
							this._capacity--;
				});
		}
});


$.wavy.wmanager = {
		current: null,
		placeholder: null
};

