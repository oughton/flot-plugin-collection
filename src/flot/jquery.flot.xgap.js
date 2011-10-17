/**
 * Flot plugin for adding gaps to the line in a line graph when a certain x threashold has been reached.
 *
 * @author Joel Oughton
 */
(function($){
    function init(plot){
    
        function checkXgapEnabled(plot, options){
        
            if (options.xaxis.insertGaps) {
                plot.hooks.processRawData.push(insertGaps);
            }
        }
        
        function insertGaps(plot, series, data, datapoints){
            if (series.xGapThresh) {
                var prev = -1;
                var holes = [];
                var offset = 0;
                var bin = series.xGapThresh;
                
                // loop through the datapoints
                for (var i = 0; i < data.length; i++) {
                    // find a hole in the data
                    if (prev != -1 &&
                    data[i][0] - prev > bin) {
                        // carefully add each hole found
                        holes.push(i + offset);
                        offset++;
                    }
                    prev = data[i][0];
                }
                
                // output all the holes as nulls
                // this breaks the line in flot
                for (var i = 0; i < holes.length; i++) {
                    data.splice(holes[i], 0, [null, null]);
                }
            }
        }
        
        plot.hooks.processOptions.push(checkXgapEnabled);
    }
    
    var options = {
        xaxis: {
            insertGaps: false, // enable or disable this plugin
        }
    };
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "xgapthreshold",
        version: "0.2"
    });
})(jQuery);
