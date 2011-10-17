function icmpModule(enabledOptions, ajaxUrl) {
	var _thisModule = this;
	var _enabledOptions = enabledOptions;
    var _ajaxUrl = ajaxUrl;

	/**
	* Puts the series into an acceptable form for our graph 
  * 
  * Min: start time in seconds
  * Max: End time in seconds
  * Bin: binsize in seconds
  * Context: context of the calling method
  * Callback: The callback function to call when we have gathered and processed the data
  *
	*/
	this.dataFunction = function(min, max, bin, context, callback) {
		$.ajax({
            url: _ajaxUrl + min + '/' + max + '/;api_key=www&stat=all&binsize=' + bin,
            dataType: "json",
            success: function(series) { 
                if (!series || !series.response || !series.response.dataset) {
                    return;
                }
                
                var processed = { sets: {} };
                var data = series.response.dataset;
                var stats = {};
                var options = _thisModule.series();
                
                if (data.length < 1) {
                    return;
                }
                
                for (var i = 0; i < data.length; i++) {
                    var dp = data[i].data;
                    var time = dp.time * 1000;
                    
                    for (var prop in dp.rtt_ms) {
                        var stat = dp.rtt_ms[prop];
                        
                        if (options[prop] == undefined) {
                            continue;
                        }
                        
                        if (!stats[prop]) {
                            stats[prop] = [];
                        }
                        
                        stats[prop].push([time, stat]);
                    }
                }

                for (var prop in stats) {
                    var cur = {
                        data: stats[prop], 
                        label: prop, 
                        xGapThresh: bin * 1000,
                    };
                
                    processed.sets[prop] = $.extend(true, {}, cur, options[prop]);
                }
                
                processed.bounds = { 
                    min: stats.loss[0][0], 
                    max: stats.loss[stats.loss.length - 1][0] 
                };

                processed.identity = {
                    min: min,
                    max: max
                };

                callback.call(context, processed);
            }
        });
        
	};
	
	/**
	* Sets up the series options.
	* eg. colour, which yaxis to draw on
	*/
	this.series = function() {
		var boxes = {
			max: {
				color: "#CB4B4B",
				yaxis: 1
			},
			min: {
				color: "#9440ED",
				yaxis: 1
			},
			mean: {
				color: "#00A8F0",
				yaxis: 1
			},
			loss: {
				color: "#4DA74D",
				yaxis: 2
			},
			jitter: {
				color: "#C0D800",
				yaxis: 1
			}
		};
		
		return boxes;
	};
	
	/**
	* Generates the input fields for the graph
	*/
	this.inputFields = function() {
		var boxes = {};
		var series = this.series();
	
		// set the default stat to be the mean
		for (var i = 0; i < _enabledOptions.length; i++) {
			if (_enabledOptions[i] == "latency")
				_enabledOptions[i] = "mean";
		}
		
		for (var stat in series) {
			s = series[stat];
			var box;
			var section = "Latency";
			
			if (stat == "loss") {
				section = "Other";
			}
			
			if ($.inArray(stat, _enabledOptions) != -1) {
				box = $('<input checked="" type="checkbox" name="' + stat + '">');
			} else {
				box = $('<input type="checkbox" name="' + stat + '">');
			}
			
			if (!boxes[section]) {
				boxes[section] = [];
			}
			
			boxes[section].push(box);
		}
			
		// return all the boxes 
		return boxes;
	};
}
