module("Flot Plugin - cacher");

test("Create a data cache", function() {
	var options = {
		xaxis: { min: 0, max: 10 },
		caching: { 
			enabled: true, binSizeMin: 0, tzOffset: 0,
			dataFunction: sinDataFunctionTest
		}
	};
	
	var container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	var plot = $.plot(container, [ [ [1, 1], [9, 2] ] ], options);
	
	var flotOptions = plot.getOptions();
	ok(flotOptions.caching.dataGrabber != undefined, "Make sure a data grabber exists");
	equals(flotOptions.caching.dataGrabber.getMinX(), 0, "Check data grabber's x min");
	equals(flotOptions.caching.dataGrabber.getMaxX(), 10, "Check data grabber's x max");
	
	delete(options.caching.enabled);
	
	container = $('<div style="height:200px;width:300px;"></div>').appendTo('#output');
	plot = $.plot(container, [ [ [1, 1], [9, 2] ] ], options);
	
	flotOptions = plot.getOptions();
	ok(flotOptions.caching.dataGrabber == undefined, "Disabled plugin");
});
