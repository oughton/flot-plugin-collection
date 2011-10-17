/**
 * Flot plugin for adding additional auto scalling modes.
 *
 * @author Joel Oughton
 */
(function($){
    function init(plot){
        var _visibleMode = false;
        var _max;
        
        plot.autoScale = function(){
            var opts = plot.getYAxes()[0].options;

            if (_visibleMode) {
                opts.min = 0;
                opts.max = _max;
            }
            plot.setupGrid();
            plot.draw();
            
            return {
                min: opts.min,
                max: opts.max
            };
        }
        
        function checkAutoScaleMode(plot, options){
            if (options.yaxis.scaleMode == "visible") {
                _visibleMode = true;
                plot.hooks.processRawData.push(autoScale);
            }
        }
        
        function autoScale(plot, series, data, datapoints){
            _max = Number.NEGATIVE_INFINITY;
            var options = plot.getOptions();

            // limit to visible serie
            if (series.lines.show || series.points.show) {
                var max = Number.NEGATIVE_INFINITY;
                
                for (var i = 0; i < data.length; i++) {
                    max = Math.max(max, data[i][1]);
                }
                
                max += max * options.yaxis.autoscaleMargin * 10;
                _max = Math.max(_max, max);
            }
        }
        
        plot.hooks.processOptions.push(checkAutoScaleMode);
    }
    
    var options = {
        yaxis: {
            scaleMode: null
        }
    };
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "autoscalemode",
        version: "0.4"
    });
})(jQuery);
