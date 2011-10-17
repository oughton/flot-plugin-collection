module("NavGraphController");

var navGraphControllerOptions = function () {
	return { 
		zoom: { interactive: true, amount: 1.25 },
		pan: { interactive: true },
		xaxis: { min: 0, max: 10 },
		yaxis: { zoomRange: [0, 0], scaleMode: "visible" },
		legend: { position: "nw", noColumns: 5 },
		caching: { 
			enabled: true, binSizeMin: 0, tzOffset: 0,
			dataFunction: sinDataFunctionTest
		}
	};
}

test("autoScaleTests", function() {
	var options = navGraphControllerOptions();

	var d1 = [ [0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [5, 3], [6, 2], [7, 1] ];
	
	var s1 = [{
		data: d1
	}];
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var navGraphController = $.navctrl(container, options);
	navGraphController.setSeries(s1);
	navGraphController.draw();
	
	equals(navGraphController.autoScale().max, 3.6, "Autoscale max");
	equals(navGraphController.autoScale().min, 0, "Autoscale min");
});

test("panRequestsTests", function() {
	var options = navGraphControllerOptions();

	var d1 = [ [0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [5, 3], [6, 2], [7, 1] ];
	
	var s1 = {
		data: d1
	};
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var navGraphController = $.navctrl(container, options);
	navGraphController.draw(s1, options);
	
	ok(navGraphController.panRequest(5, 15), "Cacher busy after pan");
});

test("zoomRequestsTests", function() {
	var options = navGraphControllerOptions();

	var d1 = [ [0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [5, 3], [6, 2], [7, 1] ];
	
	var s1 = {
		data: d1
	};
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var navGraphController = $.navctrl(container, options);
	navGraphController.draw(s1, options);
	
	ok(navGraphController.zoomRequest(-500, 500), "Cacher busy after zoom");
});
