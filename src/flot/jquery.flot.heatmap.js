/**
 * Flot plugin for drawing a heat map graph
 *
 * @author Joel Oughton
 */
(function($){
    function init(plot){
        
        plot.hooks.processRawData.push(function(plot, series, data, datapoints) {

        });
    }
    
    var options = {
        
    };
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "heatmap",
        version: "0.01"
    });
})(jQuery);
