jquery-wavy
===========

Wavy is a [jQuery UI](http://www.jqueryui.com) plugin that creates sortable paths with absolutely positioned items. These paths have a number of slots that are positioned to follow a shape, or they can be positioned manually by the user. Items can be dragged into these slots and can be rearranged at any time. Multiple paths can be combined to form custom shapes and a number of options allow you to control how they work.


Usage
-----

Include ```jquery-wavy.js``` on your page, along with [jQuery](http://www.jquery.com) and [jQuery UI](http://www.jqueryui.com), and execute the following:

```javascript
$("#wavy").wavy({ path: [["line", 5, 0, 0, 300, 300]] });
```

This will create a sortable path in the shape of a line, from coordinates 0x0 to 300x300, containing 5 evenly spaced slots.


Paths
-----

Wavy supports the following types of paths:
* line: A straight line; must be given the starting and ending point.

```javascript
$("#wavy").wavy({ path: [["line", 5, 0, 0, 300, 300]] });
```

* arc: A circle arc; must be given the center and radius of the circle, as well as the starting and ending angle (in degrees).

```javascript
$("#wavy").wavy({ path: [["arc", 5, 100, 100, 100, 0, 360]] });
```

* bezier: A cubic Bezier curve; must be given the starting and ending point, as well as the 2 control points.

```javascript
$("#wavy").wavy({ path: [["bezier", 5, 0, 0, 300, 300, 50, 250, 250, 50]] });
```

The path option takes a list of paths containing the path type and coordinates and the number of slots that will be placed in that path. The first element is the path type and the second element is the number of slots. The following elements are the coordinates for that particular path.

A wavy can contain multiple paths that do not have to connect at ends. They can even overlap, but be careful not to place them in such a way that slots will overlap, as this will cause problems in drag and drop detection.


Building
--------

Make sure you have nodejs, npm, grunt and grunt-cli installed and then run the following:

```bash
git clone git@github.com:NiGhTTraX/jquery-wavy.git
cd jquery-wavy
npm install
grunt
```

If all went well, you will find a minified version of the plugin in the ```build/``` folder.


Testing
-------

Run ```grunt test``` to run the tests in [PhantomJS](https://github.com/ariya/phantomjs) or open ```tests/index.html``` to run them in your browser. Tests are written using the [QUnit](http://www.qunitjs.com/) framework and the [jQuery Event Unit Testing Helpers](https://github.com/jquery/jquery-simulate).

To enable coverage, place the ```resources/``` and ```tests/``` folders in your webserver and run the tests from there with the coverage option in QUnit checked (running coverage locally will throw a cross-domain error). Coverage is done using [blanket.js](http://www.blanketjs.org).
