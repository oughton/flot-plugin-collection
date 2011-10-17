module("Flot Plugin - selectseries");

test("Three test datasets", function() {
	var d1 = [ [0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [6, 2], [7, 1] ];
	var d2 = [ [0, 3], [5, 3], [15, 4], [20, 3], [25, 2], [30, 1] ];
	var d3 = [ [0, 3], [50, 3], [100, 4], [200, 3], [250, 2], [300, 1], [400, 3] ];
	
	var s1 = {
		data: d1,
		xGapThresh: 1,
		label: "d1"
	};
	
	var s2 = {
		data: d2,
		xGapThresh: 5,
		label: "d2"
	};
	
	var s3 = {
		data: d3,
		xGapThresh: 50,
		label: "d3"
	};
    
    var series = [ s1, s2, s3 ];
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var plot = $.plot(container, []);
    plot.drawSelected(series, [ "d1", "d3" ]);
    
	var data = plot.getData();
    
	equals(data[0].label, "d1", "Check that d1 is visible");
	equals(data[1].label, "d3", "Check that d3 is visible");
	
	plot.drawSelected(series, []);
	data = plot.getData();
	
	equals(data[0], undefined, "Check that d1 is hidden");
	equals(data[1], undefined, "Check that d2 is hidden");
	equals(data[2], undefined, "Check that d3 is hidden");
	
    plot.drawSelected(series, [ "else" ]);   
	data = plot.getData();
	
	equals(data[0], undefined, "A non-existent label");
});
