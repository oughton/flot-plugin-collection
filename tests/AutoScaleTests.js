module("Flot Plugin - autoscale");

test("Test dataset", function() {
	var options = {
		yaxis: {
			scaleMode: "visible",
			autoscaleMargin: 0.02
		}
	}

	var d1 = [ [0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [6, 2], [7, 1] ];
	var d2 = [ [0, 3], [5, 3], [15, 4], [20, 3], [25, 2], [30, 1] ];
	
	var s1 = {
		data: d1,
		xGapThresh: 1
	};
	
	var s2 = {
		data: d2,
		xGapThresh: 5
	};
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var plot = $.plot(container, [ s1, s2 ], options);

	plot.autoScale();
	
	equals(plot.getYAxes()[0].max, 0.02 * 10 * 4 + 4, "Check for correct y axis max");
});

test("Disabled plugin", function() {
	var d1 = [ [0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [6, 2], [7, 1] ];
	var d2 = [ [0, 3], [5, 3], [15, 4], [20, 3], [25, 2], [30, 1] ];
	
	var s1 = {
		data: d1,
		xGapThresh: 1
	};
	
	var s2 = {
		data: d2,
		xGapThresh: 5
	};
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var plot = $.plot(container, [ s1, s2 ]);

	var axes = plot.getAxes();
	ok(axes.yaxis.max != 0.02 * 10 * 4 + 4, "Check for correct y axis max");
});
