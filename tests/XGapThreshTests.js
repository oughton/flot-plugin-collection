module("Flot Plugin - xgapthresh");

test("One dataset", function() {
	var options = {
		xaxis: {
			insertGaps: true
		}
	}

	var d1 = [ [0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [6, 2], [7, 1] ];
	
	var s1 = [{
		data: d1,
		xGapThresh: 1
	}];
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var plot = $.plot(container, s1, options);

	var data = plot.getData();

	equals(data[0].data[5][0], null, "A null should be inserted between points 4 and 5");
	equals(data[0].data[5][1], null, "Make sure y is null too");
	ok(data[0].data[0][1] != null, "Make sure left data bound is not null");
	ok(data[0].data[data[0].data[0].length - 1][1] != null, "Make sure right data bound is not null");
});

test("Three datasets", function() {
	var options = {
		xaxis: {
			insertGaps: true
		}
	}

	var d1 = [ [0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [6, 2], [7, 1] ];
	var d2 = [ [0, 3], [5, 3], [15, 4], [20, 3], [25, 2], [30, 1] ];
	var d3 = [ [0, 3], [50, 3], [100, 4], [200, 3], [250, 2], [300, 1], [400, 3] ];
	
	var s1 = {
		data: d1,
		xGapThresh: 1
	};
	
	var s2 = {
		data: d2,
		xGapThresh: 5
	};
	
	var s3 = {
		data: d3,
		xGapThresh: 50
	};
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var plot = $.plot(container, [ s1, s2, s3 ], options);

	var data = plot.getData();
	equals(null, data[0].data[5][0], "Check d1 nulls");
	equals(null, data[1].data[2][1], "Check d2 nulls");	
	equals(null, data[2].data[3][1], "Check d3 1st null");	
	equals(null, data[2].data[7][1], "Check d3 2nd null");
	ok(data[2].data[8][1] != null, "Random other test");	
});

test("Disabled plugin", function() {
	var d1 = [ [0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [6, 2], [7, 1] ];
	var d2 = [ [0, 3], [5, 3], [15, 4], [20, 3], [25, 2], [30, 1] ];
	var d3 = [ [0, 3], [50, 3], [100, 4], [200, 3], [250, 2], [300, 1], [400, 3] ];
	
	var s1 = {
		data: d1,
		xGapThresh: 1
	};
	
	var s2 = {
		data: d2,
		xGapThresh: 5
	};
	
	var s3 = {
		data: d3,
		xGapThresh: 50
	};
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var plot = $.plot(container, [ s1, s2, s3 ]);

	var data = plot.getData();
	ok(data[0].data[5][0] != null, "Check d1 nulls");
	ok(data[1].data[2][1] != null, "Check d2 nulls");	
	ok(data[2].data[3][1] != null, "Check d3 1st null");
});