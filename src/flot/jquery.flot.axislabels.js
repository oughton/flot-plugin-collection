/**
 * Flot plugin for drawing axis labels
 *
 * Note: this plugin uses the raphael drawing library.
 *
 * @author Joel Oughton
 */
(function($){
    function init(plot){
        var _flotPadder;

        var _drawLabel = function(left, top, width, height, label, style, axis) {
            var plotOffset = plot.getPlotOffset(), left, top, div, r, text, bb;
            
            div = $("<div></div>")
                .css({ position: "absolute", left: left, top: top })
                .appendTo(plot.getPlaceholder());

            r = Raphael(div[0], width, height);
            text = r.text(0, 0, label).attr(style);
            bb = text.getBBox();

            // rotate and translate to the mid position
            if (axis == "y") { 
                text.rotate(-90);
                text.translate(bb.height / 2, height / 2);
            } else {
                text.translate(width / 2, bb.height / 2);
            }
        }

        /**
         * Get the bounding box of a printed string
         *
         * @param text
         *          the text to measure
         * @param style
         *          the text styling (see Raphael's API Doc)
         */
        var _getPrintBBox = function(text, style) {
            var paper = Raphael(0, 0, 1, 1);
            var bb;
            var txt = paper.text(0, 0, text).attr(style);
     
            bb = txt.getBBox();
            txt.remove();
            paper.remove();
     
            return { width: bb.width, height: bb.height };
        };

        /**
         * Sets up padding around the flot graph to protect label overlap
         *
         * @param padding
         *          css property object containing desired padding
         */
        var _setupPadding = function(padding) {
            // create a div around our graph
            if (!_flotPadder) {
                var parent = plot.getPlaceholder().parent();
                _flotPadder = $("<div></div>");
                _flotPadder.append(plot.getPlaceholder());
                parent.append(_flotPadder);
            }

            if (padding) _flotPadder.css(padding);
        };
   
        /**
         * Draws a x axis label
         *
         * @param xLabel
         *          the x axis label
         * @param style
         *          the text style (see Raphael's API Doc)
         */
        plot.drawXaxisLabel = function(xLabel, style) {
            var div = plot.getPlaceholder(), o = plot.getPlotOffset();
            
            if (xLabel) {
                _drawLabel(0, plot.height() + o.bottom + 10, div.width(), _getPrintBBox(xLabel, style).height, xLabel, style, "x");
                _setupPadding({ "padding-bottom":  _getPrintBBox(xLabel, style).height });
            }
        };

        /**
         * Draws a y axis label
         *
         * @param yLabel
         *          the y axis label
         * @param style
         *          the text style (see Raphael's API Doc)
         */
        plot.drawYaxisLabel = function(yLabel, style, position) {
            var div = plot.getPlaceholder(), width = _getPrintBBox(yLabel, style).height + 10,
                o = plot.getPlotOffset(), left, top = -o.top;

            // check which side of the plot to place the label
            if (position == "left") left = -width;
            else left = div.width();
            
            if (yLabel) {
                _drawLabel(left, top, width, div.height(), yLabel, style, "y");
            }
        };
    }
    
    var options = {
    };
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "axislabels",
        version: "0.2"
    });
})(jQuery);
