module("Flot Plugin - events");

test("showEvents", function(){
    var d1 = [[0, 1], [1, 1], [2, 0], [3, 1], [4, 2], [6, 2], [7, 1]];
    var d2 = [[0, 3], [5, 3], [15, 4], [20, 3], [25, 2], [30, 1]];
    var d3 = [[0, 3], [50, 3], [100, 4], [200, 3], [250, 2], [300, 1], [400, 3]];
    
    var s1 = {
        data: d1,
        label: "d1"
    };
    
    var s2 = {
        data: d2,
        label: "d2"
    };
    
    var s3 = {
        data: d3,
        label: "d3"
    };
    
    var series = [s1, s2, s3];
    
    var container = $('<div style="height:250px;width:480px;"></div>').appendTo('#output');
    var plot = $.plot(container, series);
    
    //plot.setEvents();
    //plot.showEvents();
    
    ok(true);
});

test("setEvents", function(){
    var d1 = [[1283385750000, 15], [1283386050000, 15], [1283386350000, 15], [1283386650000, 15], [1283386950000, 15], [1283387250000, 15], [1283387550000, 15], [1283387850000, 15], [1283388150000, 15], [1283388450000, 15], [1283388750000, 15], [1283389050000, 15], [1283389350000, 16], [1283389650000, 15], [1283389950000, 15], [1283390250000, 15], [1283390550000, 15], [1283390850000, 15], [1283391150000, 15], [1283391450000, 15], [1283391750000, 15], [1283392050000, 15], [1283392350000, 15], [1283392650000, 15], [1283392950000, 15], [1283393250000, 15], [1283393550000, 15], [1283393850000, 15], [1283394150000, 15], [1283394450000, 15], [1283394750000, 15], [1283395050000, 15], [1283395350000, 15], [1283395650000, 15], [1283395950000, 15], [1283396250000, 15], [1283396550000, 15], [1283396850000, 15], [1283397150000, 15], [1283397450000, 15], [1283397750000, 15], [1283398050000, 15], [1283398350000, 15], [1283398650000, 15], [1283398950000, 15], [1283399250000, 15], [1283399550000, 15], [1283399850000, 15], [1283400150000, 15], [1283400450000, 15], [1283400750000, 15], [1283401050000, 15], [1283401350000, 15], [1283401650000, 15], [1283401950000, 15], [1283402250000, 15], [1283402550000, 15], [1283402850000, 15], [1283403150000, 15], [1283403450000, 15], [1283403750000, 15], [1283404050000, 15], [1283404350000, 15], [1283404650000, 15], [1283404950000, 15], [1283405250000, 15], [1283405550000, 15], [1283405850000, 15], [1283406150000, 15], [1283406450000, 15], [1283406750000, 15], [1283407050000, 15], [1283407350000, 15], [1283407650000, 16], [1283407950000, 15], [1283408250000, 17], [1283408550000, 15], [1283408850000, 15], [1283409150000, 15], [1283409450000, 15], [1283409750000, 15], [1283410050000, 15], [1283410350000, 15], [1283410650000, 15], [1283410950000, 15], [1283411250000, 15], [1283411550000, 15], [1283411850000, 15], [1283412150000, 15], [1283412450000, 15], [1283412750000, 15], [1283413050000, 15], [1283413350000, 15], [1283413650000, 15], [1283413950000, 15], [1283414250000, 15], [1283414550000, 15], [1283414850000, 15], [1283415150000, 15], [1283415450000, 15], [1283415750000, 15], [1283416050000, 15], [1283416350000, 15], [1283416650000, 15], [1283416950000, 15], [1283417250000, 15], [1283417550000, 15], [1283417850000, 15], [1283418150000, 15], [1283418450000, 15], [1283418750000, 15], [1283419050000, 15], [1283419350000, 15], [1283419650000, 15], [1283419950000, 15], [1283420250000, 15], [1283420550000, 15], [1283420850000, 15], [1283421150000, 16], [1283421450000, 15], [1283421750000, 16], [1283422050000, 15], [1283422350000, 15], [1283422650000, 25], [1283422950000, 15], [1283423250000, 15], [1283423550000, 15], [1283423850000, 15], [1283424150000, 15], [1283424450000, 15], [1283424750000, 15], [1283425050000, 15], [1283425350000, 15], [1283425650000, 15], [1283425950000, 15], [1283426250000, 16], [1283426550000, 15], [1283426850000, 15], [1283427150000, 15], [1283427450000, 15], [1283427750000, 15], [1283428050000, 15], [1283428350000, 15], [1283428650000, 16], [1283428950000, 16], [1283429250000, 15], [1283429550000, 15], [1283429850000, 15], [1283430150000, 15], [1283430450000, 15], [1283430750000, 15], [1283431050000, 15], [1283431350000, 15], [1283431650000, 15], [1283431950000, 15], [1283432250000, 15], [1283432550000, 15], [1283432850000, 15], [1283433150000, 16], [1283433450000, 15], [1283433750000, 15], [1283434050000, 15], [1283434350000, 15], [1283434650000, 16], [1283434950000, 15], [1283435250000, 16], [1283435550000, 15], [1283435850000, 15], [1283436150000, 15], [1283436450000, 16], [1283436750000, 15], [1283437050000, 15], [1283437350000, 15], [1283437650000, 15], [1283437950000, 16], [1283438250000, 15], [1283438550000, 15], [1283438850000, 15], [1283439150000, 17], [1283439450000, 15], [1283439750000, 15], [1283440050000, 15], [1283440350000, 16], [1283440650000, 15], [1283440950000, 15], [1283441250000, 16], [1283441550000, 16], [1283441850000, 15], [1283442150000, 15], [1283442450000, 15], [1283442750000, 19], [1283443050000, 15], [1283443350000, 15], [1283443650000, 15], [1283443950000, 15], [1283444250000, 15], [1283444550000, 15], [1283444850000, 17], [1283445150000, 15], [1283445450000, 15], [1283445750000, 15], [1283446050000, 15], [1283446350000, 15], [1283446650000, 15], [1283446950000, 15], [1283447250000, 15], [1283447550000, 15], [1283447850000, 15], [1283448150000, 15], [1283448450000, 15], [1283448750000, 15], [1283449050000, 15], [1283449350000, 15], [1283449650000, 15], [1283449950000, 15], [1283450250000, 15], [1283450550000, 15], [1283450850000, 15], [1283451150000, 15], [1283451450000, 15], [1283451750000, 15], [1283452050000, 15]];
    
    var s1 = {
        data: d1,
        label: "d1"
    };
    
    var series = [s1];
    
    var events = [{
        min: 1283400150000,
        max: 1283425000000,
        eventType: "warning",
        title: "Sky Tower Fire",
        description: "ISP equipment running off UPSs as mains electricity supply to the sky tower was cut off"
    }, {
        min: 1283420000000,
        max: 1283420000000,
        eventType: "info",
        title: "TitleInfo1",
        description: "Lorem ipsum dolor sit amet, eu quia justo tellus, iaculis gravida faucibus velit wisi. Dignissim sapien reiciendis morbi, pede sed luctus in, hymenaeos risus faucibus justo, ac feugiat sapien lorem condimentum. "
    }, {
        min: 1283401550000,
        max: 1283401550000,
        eventType: "info",
        title: "TitleInfo2",
        description: "Lorem ipsum dolor sit amet, eu quia justo tellus, iaculis gravida faucibus velit wisi. Dignissim sapien reiciendis morbi, pede sed luctus in, hymenaeos risus faucibus justo, ac feugiat sapien lorem condimentum. "
    }];
    
    var container = $('<div style="height:250px;width:480px;"></div>').appendTo('#output');
    var plot = $.plot(container, series, {
        events: {
            data: events
        },
        selection: {
            color: "#e8cfac"
        },
        xaxis: {
            mode: "time"
        }
    });
    
    //plot.showEvents();
    
    var e = plot.getEvents();

    //equals(e[0].getOptions().title, "Sky Tower Fire", "Check that the Sky Tower Fire event exists");
    //equals(e[2].getOptions().title, "TitleInfo2", "Check that the TitleInfo2 event exists");
});

test("setEvents(hierachical)", function(){
    var d1 = [[1283385750000, 15], [1283386050000, 15], [1283386350000, 15], [1283386650000, 15], [1283386950000, 15], [1283387250000, 15], [1283387550000, 15], [1283387850000, 15], [1283388150000, 15], [1283388450000, 15], [1283388750000, 15], [1283389050000, 15], [1283389350000, 16], [1283389650000, 15], [1283389950000, 15], [1283390250000, 15], [1283390550000, 15], [1283390850000, 15], [1283391150000, 15], [1283391450000, 15], [1283391750000, 15], [1283392050000, 15], [1283392350000, 15], [1283392650000, 15], [1283392950000, 15], [1283393250000, 15], [1283393550000, 15], [1283393850000, 15], [1283394150000, 15], [1283394450000, 15], [1283394750000, 15], [1283395050000, 15], [1283395350000, 15], [1283395650000, 15], [1283395950000, 15], [1283396250000, 15], [1283396550000, 15], [1283396850000, 15], [1283397150000, 15], [1283397450000, 15], [1283397750000, 15], [1283398050000, 15], [1283398350000, 15], [1283398650000, 15], [1283398950000, 15], [1283399250000, 15], [1283399550000, 15], [1283399850000, 15], [1283400150000, 15], [1283400450000, 15], [1283400750000, 15], [1283401050000, 15], [1283401350000, 15], [1283401650000, 15], [1283401950000, 15], [1283402250000, 15], [1283402550000, 15], [1283402850000, 15], [1283403150000, 15], [1283403450000, 15], [1283403750000, 15], [1283404050000, 15], [1283404350000, 15], [1283404650000, 15], [1283404950000, 15], [1283405250000, 15], [1283405550000, 15], [1283405850000, 15], [1283406150000, 15], [1283406450000, 15], [1283406750000, 15], [1283407050000, 15], [1283407350000, 15], [1283407650000, 16], [1283407950000, 15], [1283408250000, 17], [1283408550000, 15], [1283408850000, 15], [1283409150000, 15], [1283409450000, 15], [1283409750000, 15], [1283410050000, 15], [1283410350000, 15], [1283410650000, 15], [1283410950000, 15], [1283411250000, 15], [1283411550000, 15], [1283411850000, 15], [1283412150000, 15], [1283412450000, 15], [1283412750000, 15], [1283413050000, 15], [1283413350000, 15], [1283413650000, 15], [1283413950000, 15], [1283414250000, 15], [1283414550000, 15], [1283414850000, 15], [1283415150000, 15], [1283415450000, 15], [1283415750000, 15], [1283416050000, 15], [1283416350000, 15], [1283416650000, 15], [1283416950000, 15], [1283417250000, 15], [1283417550000, 15], [1283417850000, 15], [1283418150000, 15], [1283418450000, 15], [1283418750000, 15], [1283419050000, 15], [1283419350000, 15], [1283419650000, 15], [1283419950000, 15], [1283420250000, 15], [1283420550000, 15], [1283420850000, 15], [1283421150000, 16], [1283421450000, 15], [1283421750000, 16], [1283422050000, 15], [1283422350000, 15], [1283422650000, 25], [1283422950000, 15], [1283423250000, 15], [1283423550000, 15], [1283423850000, 15], [1283424150000, 15], [1283424450000, 15], [1283424750000, 15], [1283425050000, 15], [1283425350000, 15], [1283425650000, 15], [1283425950000, 15], [1283426250000, 16], [1283426550000, 15], [1283426850000, 15], [1283427150000, 15], [1283427450000, 15], [1283427750000, 15], [1283428050000, 15], [1283428350000, 15], [1283428650000, 16], [1283428950000, 16], [1283429250000, 15], [1283429550000, 15], [1283429850000, 15], [1283430150000, 15], [1283430450000, 15], [1283430750000, 15], [1283431050000, 15], [1283431350000, 15], [1283431650000, 15], [1283431950000, 15], [1283432250000, 15], [1283432550000, 15], [1283432850000, 15], [1283433150000, 16], [1283433450000, 15], [1283433750000, 15], [1283434050000, 15], [1283434350000, 15], [1283434650000, 16], [1283434950000, 15], [1283435250000, 16], [1283435550000, 15], [1283435850000, 15], [1283436150000, 15], [1283436450000, 16], [1283436750000, 15], [1283437050000, 15], [1283437350000, 15], [1283437650000, 15], [1283437950000, 16], [1283438250000, 15], [1283438550000, 15], [1283438850000, 15], [1283439150000, 17], [1283439450000, 15], [1283439750000, 15], [1283440050000, 15], [1283440350000, 16], [1283440650000, 15], [1283440950000, 15], [1283441250000, 16], [1283441550000, 16], [1283441850000, 15], [1283442150000, 15], [1283442450000, 15], [1283442750000, 19], [1283443050000, 15], [1283443350000, 15], [1283443650000, 15], [1283443950000, 15], [1283444250000, 15], [1283444550000, 15], [1283444850000, 17], [1283445150000, 15], [1283445450000, 15], [1283445750000, 15], [1283446050000, 15], [1283446350000, 15], [1283446650000, 15], [1283446950000, 15], [1283447250000, 15], [1283447550000, 15], [1283447850000, 15], [1283448150000, 15], [1283448450000, 15], [1283448750000, 15], [1283449050000, 15], [1283449350000, 15], [1283449650000, 15], [1283449950000, 15], [1283450250000, 15], [1283450550000, 15], [1283450850000, 15], [1283451150000, 15], [1283451450000, 15], [1283451750000, 15], [1283452050000, 15]];
    
    var s1 = {
        data: d1,
        label: "d1",
        xaxis: 1
    };
    
    var series = [s1];
    
    var events = [{
        min: 1283400150000,
        max: 1283425000000,
        eventType: "warning",
        title: "Sky Tower Fire",
        description: "ISP equipment running off UPSs as mains electricity supply to the sky tower was cut off"
    }, {
        min: 1283420000000,
        max: 1283420000000,
        eventType: "info",
        title: "TitleInfo1",
        description: "Lorem ipsum dolor sit amet, eu quia justo tellus, iaculis gravida faucibus velit wisi. Dignissim sapien reiciendis morbi, pede sed luctus in, hymenaeos risus faucibus justo, ac feugiat sapien lorem condimentum. "
    }, {
        min: 1283401550000,
        max: 1283401550000,
        eventType: "info",
        title: "TitleInfo2",
        description: "Lorem ipsum dolor sit amet, eu quia justo tellus, iaculis gravida faucibus velit wisi. Dignissim sapien reiciendis morbi, pede sed luctus in, hymenaeos risus faucibus justo, ac feugiat sapien lorem condimentum. "
    }, {
        min: 1283405550000,
        eventType: "other",
        title: "TitleOther1",
        description: "Lorem ipsum dolor sit amet, eu quia justo tellus, iaculis gravida faucibus velit wisi. Dignissim sapien reiciendis morbi, pede sed luctus in, hymenaeos risus faucibus justo, ac feugiat sapien lorem condimentum. "
    }, {
        min: 1283406560000,
        eventType: "other",
        title: "TitleOther2",
        description: "Lorem ipsum dolor sit amet, eu quia justo tellus, iaculis gravida faucibus velit wisi. Dignissim sapien reiciendis morbi, pede sed luctus in, hymenaeos risus faucibus justo, ac feugiat sapien lorem condimentum. "
    }, {
        min: 1283407570000,
        eventType: "other",
        title: "TitleOther3",
        description: "Lorem ipsum dolor sit amet, eu quia justo tellus, iaculis gravida faucibus velit wisi. Dignissim sapien reiciendis morbi, pede sed luctus in, hymenaeos risus faucibus justo, ac feugiat sapien lorem condimentum. "
    }];
    
    var container = $('<div style="height:250px;width:480px;"></div>').appendTo('#output');
    var plot = $.plot(container, series, {
        events: {
            levels: 3,
            data: events,
            types: {
                "warning": {
                    level: 0
                },
                "info": {
                    level: 1
                },
                "other": {
                    level: 2
                }
            }
        },
        selection: {
            color: "#e8cfac"
        },
        xaxis: {
            mode: "time"
        }
    });
    
    //plot.showEvents();
    
    var e = plot.getEvents();
    
    //equals(e[0].getOptions().title, "Sky Tower Fire", "Check that the highest level is in place"); 
    //equals(e[1].getOptions().title, "TitleInfo1", "Check that the middle level is in place"); 
    //equals(e[2].getOptions().title, "TitleInfo2", "Check that the lowest level is in place"); 
    
    // too many levels
    try {
        plot = $.plot(container, series, {
            events: {
                levels: 3,
                data: events,
                types: {
                    "warning": {
                        level: 0
                    },
                    "info": {
                        level: 1
                    },
                    "other": {
                        level: 4
                    }
                }
            },
            selection: {
                color: "#e8cfac"
            },
            xaxis: {
                mode: "time"
            }
        });
        
        ok(false, "Didn't throw too many levels exception");
    } catch (er) {
        ok(true, "Catch the too many levels exception");
    }
    //plot.showEvents();
    //plot.hideEvents();
    
    plot = $.plot(container, series, {
        events: {
            levels: 3,
            data: events,
            types: {
                "warning": {
                    level: 0
                },
                "info": {
                    level: 1
                },
                "other": {
                    level: 2
                }
            }
        },
        selection: {
            color: "#e8cfac"
        },
        xaxis: {
            mode: "time"
        },
        yaxis: {
            zoomRange: [0, 0],
            panRange: [14, 26]
        },
        zoom: {
            interactive: true,
            amount: 1.25
        },
        pan: {
            interactive: true
        }
    });    
    
    plot.showEvents({ min: 0});
});

test("traffic data", function(){    
    var container = $('<div style="height:350px;width:900px;"></div>').appendTo('#output');
    
    var _varianceAlgorithm = function(response, ticks, sens) {
        // variance algorithm
        var sids = [];
        var clusters = [];
        
        for (var i = 0; i < 100; i++) {
            sids[i] = [];
            clusters[i] = [];
        }
        
        $.each(response.data, function(index, val) {
            sids[val[1]].push(val[0] / 1000);
        });
            
    
        // build variances
        for (var sid = 0; sid < sids.length; sid++) {
        
            var cluster;
            var highestCount = 0, mostCommonValue = 0, sum = 0, n = 0;
            var points = sids[sid];
            
            for (var i = 1; i < points.length - 1; i++) {
                var diff = points[i] - points[i - 1];
                
                sum += diff;
                n++;
            }
            

            // first point
            cluster = [ points[0] ];
            
            for (var i = 1; i < points.length; i++) {
                
                var leftDiff = points[i] - points[i - 1];
                var rightDiff = points[i + 1] - points[i];
    
                var gRange = 1269252510217 - 1269252069000;
                density = leftDiff / gRange;
                //console.log(gRange, (sum / n) * sens, "density:", ((sum / n) * sens) / gRange);
    
    
                if (leftDiff > (sum / n) * sens && density > 0.05) {
                    clusters[sid].push(cluster);
                    cluster = [ points[i] ];
                } else {
                    cluster.push(points[i]);
                }
            }
            
            // last point
            if (points.length > 1) {
            
                if (points[points.length - 1] - points[points.length - 2] > (sum / n) * sens) {
                    clusters[sid].push(cluster);
                    cluster =  points[points.length - 1]; 
                } else {
                    cluster.push(points[points.length - 1]);
                }
                
            }
            
            clusters[sid].push(cluster);
            
            /*
            console.log("SID: " + ticks[sid][1]);
            console.log(
                 "Number of points: " + points.length,
                 ",most common value:" + mostCommonValue,
                 ", highest count:" + highestCount, 
                 ", average variances:", sum, n, 
                 ", average variance:" + (sum / n),
                 ", Num of clusters: " + clusters[sid].length);
            console.log("\n");*/
            //break;
        }
        
        return { clusters: clusters, sids: sids };
    };
    
    var _graphVariances = function(clusters, sids, min, max) {
        var series = [];
            
            
        var getColor = function(n) {
            if (n % 2 == 0) return "#ff0000";
            else return "#000000";
        };

        for (var sid = 0; sid < sids.length; sid++) {

            for (var i = 0; i < clusters[sid].length; i++) {
                var s = { data: [], color: getColor(i) };
                var cluster = clusters[sid][i];
                                
                for (var j = 0; j < cluster.length; j++) {
                    s.data.push([cluster[j], sid]);
                }
                
                series.push(s);
            }
        
        }
        
        container = $('<div style="height:600px;width:900px;"></div>').appendTo('#output');
        plot = $.plot(container, series, { 
            lines: { lineWidth: 5 }, 
            xaxis: { min: min, max: max,  mode: "time" },
            points: { show: true, radius: 5 },
            yaxis: { ticks: sids }
        });
    };
    
    $.ajax({ 
        //url: "events-test.php?min=1269252010217043&max=1269252110217043",
        url: "events-test.php?min=1269252069000000&max=1269252510217043",
        dataType: "json",
        success: function(response) {
        
            $.ajax({ 
                url: "andreas-test.php?min=1269252069000000&max=1269266409000000",
                dataType: "json",
                success: function(response) {
                    
                }
            });
        
            var ticks = [];
            var flotData = [];
            
            $.each(response.ticks, function(index, tick) {
                ticks.push([tick, index]);
            });

            $.each(response.data, function(index, val) {
                flotData.push([Math.round(val[0] / 1000), val[1]]);
            });

            var plot = $.plot(container, [ { data: flotData, shadowSize: 0, color: "#0000ff" } ], {
                yaxis: {
                    ticks: ticks
                },
                xaxis: {
                    mode: "time"
                },
                points: {
                    show: true,
                    radius: 0.5,
                }
            });
            
            
            // try variances
            
            for (var i = 1; i < 2; i++) {
            
                var variance = _varianceAlgorithm(response, ticks, i);                
                
                /*
                * graph
                */
                var xaxis = plot.getAxes().xaxis;                
                _graphVariances(variance.clusters, ticks, xaxis.min, xaxis.max);  
                  
            }
        }
    });
    
    });
    
    test("2traffic data", function(){    
    
    var container = $('<div style="height:350px;width:900px;"></div>').appendTo('#output');
    var options = {
        yaxis: {
            zoomRange: [0, 0],
            min: 0,
            tickFormatter: function(val, axis) {
                return val + " mb/m";
            }
        },
        y2axis: { color: "#545454", zoomRange: [0, 0] },
        xaxis: {
            min: 1269252069000,
            max: 1269252510217,
            mode: "time"
        },
        zoom: {
            interactive: true,
            amount: 1.25
        },
        pan: {
            interactive: true
        },
        hooks: {
            processDatapoints: [ function(plot, series, datapoints) {
                var points = datapoints.points, ps = datapoints.pointsize;
                for (var i = 0; i < points.length; i += ps)
                    points[i] /= 1000;
            }]
        }
    };
    
    var plot = $.plot(container, [], options);
 
    $.ajax({ 
        //url: "events-test.php?type=all&min=1269252069000000&max=1269252510217043",
        url: "events-test.php?type=all&min=1269252069000000&max=1269252775372364",
        dataType: "json",
        success: function(response) {
        
            $.ajax({ 
                url: "andreas-test.php?min=1269252069000000&max=1269266409000000",
                dataType: "json",
                success: function(response) {
                    
                    plot = $.plot(container, [ 
                        { data: response[0].data, label: response[0].label, yaxis: 1 },
                        { data: response[1].data, label: response[1].label, yaxis: 2 }],
                        options);
                }
            });
        
            var ticks = [];
            var flotData = [];
            var eventData = [], typeData = [];
            
            $.each(response.ticks, function(index, tick) {
                ticks.push([tick, index]);
            });

            // min, max, eventType, title, description
            
            // build events
            $.each(response.data, function(index, val) {
                var type = val[1] + "," + val[2];
            
                /*if (!typeData[type]) {
                    typeData[type] = {
                        eventType: type
                    };
                }*/
            
                eventData.push({
                    min: Math.round(val[0] / 1000),
                    eventType: val[1] + "," + val[2],
                    title: "SID: " + val[1],
                    description: "Rev: " + val[2]
                });
            });
            
            //console.log(eventData);
            //options.yaxis.ticks = ticks;
            options.events = {
                clustering: true,
                data: eventData
            };
            
            //plot = $.plot(container, [ { data: [], shadowSize: 0, color: "#0000ff" } ], options);
            
            //plot.showEvents();
            
            
        }
    });
    
    });
            
 
