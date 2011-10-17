/**
 * Flot plugin for selecting which series to draw
 *
 * @author Joel Oughton
 */
(function($){
    function init(plot){
    
        plot.drawSelected = function drawSelected(data, selected){
            var d = [];

            if (selected) {
                for (var i = 0; i < data.length; i++) {
                    if ($.inArray(data[i].label, selected) != -1) {
                        d.push(data[i]);
                    }
                }
                
                plot.setData(d);
            } else {
                plot.setData(data);
            }
            
            plot.setupGrid();
            plot.draw();
        }
    }
    
    $.plot.plugins.push({
        init: init,
        name: "selectseries",
        version: "0.3"
    });
})(jQuery);
