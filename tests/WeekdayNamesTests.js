module("Flot Plugin - weekdaynames");

test("week day names", function() {
	var d1 = [ [1283904000000, 15], [1284508800000, 15] ]; // 1 weeek
    
    var s1 = {
        data: d1,
        label: "d1"
    };
    
    var series = [s1];

    var container = $('<div style="height:150px;width:300px;"></div>').appendTo('#output');
    var plot = $.plot(container, series, {
        xaxis: {
            mode: "time",
            timeformat: "weekdays"
        }
    });
    
    var tickFormatter = plot.getAxes().xaxis.options.tickFormatter;
    equals(tickFormatter(1283387550000, plot.getAxes().xaxis).split(' ')[0], 'Thu', "Thu string should appear");
});

test("minutes", function() {
    var d1 = [ [1284508800000, 15], [1284509100000, 15] ];  // 5 minutes
    
    var s1 = {
        data: d1,
        label: "d1"
    };
    
    var series = [s1];

    var container = $('<div style="height:150px;width:300px;"></div>').appendTo('#output');
    var plot = $.plot(container, series, {
        xaxis: {
            mode: "time",
            timeformat: "weekdays"
        }
    });
    
    var tickFormatter = plot.getAxes().xaxis.options.tickFormatter;
    equals(tickFormatter(1284509100000, plot.getAxes().xaxis).split(' ')[0], '0:05', "0:05 string should appear");
});
