/**
 * Flot plugin for drawing a heat map styled graph.
 *
 * @author Joel Oughton
 */
(function($){
    function init(plot) {
        var _options = plot.getOptions();
        var _rows = {};
        var _lastAdded;
        var _container = plot.getPlaceholder();
        var _height = plot.height();
        var _heatRun = false;
        var _colors = {};
        var _canvas;
        var _r;
        
        var _drawScale = function() {
            var pos = _container.offset(), x = _container.width(), y = plot.getPlotOffset().top, 
                r, height = plot.height(), div, ctx, linearGrad, yPos, ticksRight, width = 100, l,
                series = plot.getData()[0];
            
            if (_height == height) return;
            
            var barWidth = 20, tickWidth = 5, noOfTicks = 5; 
            var barPos = { top: 10, left: 10, bottom: 10, right: 10 + barWidth };
            var barHeight = height - barPos.top - barPos.bottom;

            _height = height;
           
            div = $("<div></div>")
                .css({ position: "absolute", left: x + barPos.left + barWidth + tickWidth, top: y })
                .appendTo(_container);

            if (_r) _r.remove();
            _r = Raphael(div[0], width, height);

            if (_canvas) _canvas.remove();
            
            _canvas = $('<div><canvas></canvas></div>').css({ 
                position: "absolute", left: x, top:  y
            }).appendTo(_container).children('canvas').attr({ height: height, width: 100 });

            ctx = _canvas[0].getContext('2d');

            linearGrad = ctx.createLinearGradient(0, barPos.top, 0, barPos.top + barHeight);

            // add color stops
            if (series && series.heatmap.colorStops) {
                $.each(series.heatmap.colorStops, function(index, val) {
                    linearGrad.addColorStop(val[0], val[1]);
                });
            }

            ctx.fillStyle = linearGrad;
            ctx.fillRect(barPos.left, barPos.top, barWidth, barHeight);
            ctx.strokeRect(barPos.left, barPos.top, barWidth, barHeight);
           
            for (var i = 0; i < noOfTicks; i++) {
                yPos = barPos.top + ( i / (noOfTicks - 1) ) * barHeight;
                ctx.moveTo(barPos.right, yPos);
                ctx.lineTo(barPos.right + tickWidth, yPos);
                
                _r.text(2, yPos, "" + (80 * ( (noOfTicks - i - 1) / (noOfTicks - 1) ))).attr({ "text-anchor": "start" });
            }
            ctx.stroke();

            l = _r.text(20, yPos, _options.heatmap.legend.label).rotate(-90).translate(0, -barHeight / 2);
        };

        var _processData = function() {
            // perfomance fix to prevent method running multiple times
            if (_heatRun) return; 
            _heatRun = true;
            
            var opts = plot.getOptions(), newData = [], sid, noData = true;
            // get the data into a form that can be used for heat map drawing
            
            $.each(plot.getData(), function(index, s) {
                var newSeries, prevPt, data = {}, row;
               
                // check for no data
                if (!s.identity || !s.identity.label) return false;
                noData = false;

                row = _rows[s.identity.label];

                if (row) data = row.data;
                $.each(s.data, function(index, dp) {
                    // have to check if undefined as 0 value may be posible
                    if (data[dp[0]] == undefined) data[dp[0]] = dp[1];
                });
                
                // assign an sid and build ticks
                if (!_lastAdded) {
                    sid = 0.5;
                    _rows[s.identity.label] = { tick: [ sid, s.identity.label ], data: data };
                    _lastAdded = _rows[s.identity.label];
                
                // the row doesn't yet exist
                } else if (!_rows[s.identity.label]) {
                    sid = _lastAdded.tick[0] + 1;
                    _rows[s.identity.label] = { tick: [ sid, s.identity.label ], data: data };
                    _lastAdded = _rows[s.identity.label];

                // the row exists - extract its sid and use that
                } else {
                    sid = _rows[s.identity.label].tick[0];
                    
                    // update the data
                    _rows[s.identity.label].data = data;
                }
                
                $.each(s.data, function(index, dp) {
                    dp[1] = sid;
                });
            });

            if (!noData) {
                _options.yaxes[0].ticks = [];
                $.each(_rows, function(index, row) {
                    _options.yaxes[0].ticks.push(row.tick);
                });
                _options.yaxes[0].max = _lastAdded.tick[0] + 0.5;
                _options.yaxes[0].min = 0;
                _options.yaxes[0].panRange = [0, _lastAdded.tick[0] + 0.5];
                
                plot.setupGrid(); 
            }
        };

        var _plotHeatLine = function(series, datapoints, xoffset, yoffset, axisx, axisy, ctx) {
            var points = datapoints.points,
                ps = datapoints.pointsize,
                prevx = null, prevy = null,
                storedY1, storedY2;

            // check if we have been given color functions
            if (!series.heatmap || !series.heatmap.valueToColor || !series.heatmap.colorStops ) {
                if (!series.heatmap) series.heatmap = {};
                series.heatmap.valueToColor = _defaultValueToColor;
                series.heatmap.colorStops = _defaultColorStops;
            }


            // make sure that the height has been calculated properly
            if (!_height || _height == 0) _height = plot.height();
            
            for (var i = ps; i < points.length; i += ps) {
                var x1 = points[i - ps], y1 = points[i - ps + 1],
                    x2 = points[i], y2 = points[i + 1];
                
                if (x1 == null || x2 == null)
                    continue;
   
                storedY1 = _rows[series.identity.label].data[x1];
                storedY2 = _rows[series.identity.label].data[x2];
                if (series.heatmap.smooth) {
                    storedY1 = Math.round(storedY1);
                    storedY2 = Math.round(storedY2);

                }

                // clip with ymin
                if (y1 <= y2 && y1 < axisy.min) {
                    if (y2 < axisy.min)
                        continue;   // line segment is outside
                    // compute new intersection point
                    x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                    y1 = axisy.min;
                }
                else if (y2 <= y1 && y2 < axisy.min) {
                    if (y1 < axisy.min)
                        continue;
                    x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                    y2 = axisy.min;
                }

                // clip with ymax
                if (y1 >= y2 && y1 > axisy.max) {
                    if (y2 > axisy.max)
                        continue;
                    x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                    y1 = axisy.max;
                }
                else if (y2 >= y1 && y2 > axisy.max) {
                    if (y1 > axisy.max)
                        continue;
                    x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                    y2 = axisy.max;
                }

                // clip with xmin
                if (x1 <= x2 && x1 < axisx.min) {
                    if (x2 < axisx.min)
                        continue;
                    y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                    x1 = axisx.min;
                }
                else if (x2 <= x1 && x2 < axisx.min) {
                    if (x1 < axisx.min)
                        continue;
                    y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                    x2 = axisx.min;
                }

                // clip with xmax
                if (x1 >= x2 && x1 > axisx.max) {
                    if (x2 > axisx.max)
                        continue;
                    y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                    x1 = axisx.max;
                }
                else if (x2 >= x1 && x2 > axisx.max) {
                    if (x1 > axisx.max)
                        continue;
                    y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                    x2 = axisx.max;
                }

                ctx.beginPath();
                ctx.lineWidth = _height / (_lastAdded.tick[0] + 1) / 2;
                
                //if (x1 != prevx || storedY1 != prevy)
                    ctx.moveTo(Math.round(axisx.p2c(x1) + xoffset) - 0.5, axisy.p2c(y1) + yoffset);
                
                prevx = x2;
                prevy = storedY2;
                ctx.lineTo(Math.round(axisx.p2c(x2) + xoffset) + 0.5, axisy.p2c(y2) + yoffset);
                
                if (!_colors[storedY1]) {
                    _colors[storedY1] = series.heatmap.valueToColor(storedY1);
                }

                ctx.strokeStyle = _colors[storedY1];
                ctx.stroke();
            }
        }

        var _drawHeatMap = function(plot, ctx) {
            var axes = plot.getAxes(), xaxis = axes.xaxis, yaxis = axes.yaxis, 
                offset = plot.getPlotOffset();
            
            plot.getOptions().series.lines.show = false;
           
            $.each(plot.getUsedAxes(), function(index, axis) {
                if (axis.direction == "x") xaxis = axis;
                if (axis.direction == "y") yaxis = axis;
            });        
            
            $.each(plot.getData(), function(index, s) {
                _plotHeatLine(s, s.datapoints, offset.left, offset.top, xaxis, yaxis, ctx); 
            });
        };

        var _processOptions = function(plot, options) {
            var opts = plot.getOptions();

            if (opts.heatmap.show) {
                plot.hooks.processRawData.push(_processData);
                plot.hooks.draw.push(function(){ _heatRun = false; });
                plot.hooks.draw.push(_drawHeatMap);
                
                if (opts.heatmap.legend.show)
                    plot.hooks.drawOverlay.push(_drawScale);
            }
        };

        plot.hooks.processOptions.push(_processOptions);
    }

    // Take a number from 0..255 (inclusive) and convert to a gradiant.
    var _getSimpleColour = function(value) {
        // Colour things from a gradient.
        var value = Math.floor(value);

        if (value>255)
            value=255;

        // if in first half, colour = (2*value, 100%, 0)
        if(value < 128) {
            value = value*2;
            value = value.toString(16); // Convert to hex.
            if(value.length == 1) value = "0"+value; // pad hex
    
            return '#'+value+'ff00';
        }

        // if in second half, colour = (100%, 100%-2*value, 0)
        value = 255-(2*(value-128));
        value = value.toString(16);
        if(value.length == 1) value = "0"+value; // pad hex

        return '#ff'+value+'00';
    }

    var _defaultValueToColor = function(value) {
        return _getSimpleColour( (value / 80) * 255 );
    };

    var _defaultColorStops = [[0, "#ff0000"], [0.5, "#ffff00"], [1, "#00ff00"]];

    var options = {
        heatmap: {
            show: false,
            legend: {
                show: true
            }
        }
    };
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "heatmap",
        version: "0.1"
    });
})(jQuery);
