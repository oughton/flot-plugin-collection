/**
 * Flot plugin for snapping the xaxis to predefined time ranges.
 *
 * @author Joel Oughton
 */
(function($){
    function init(plot) {
        var _stripTimezone = function(date) {
            var opts = plot.getOptions(), newDate;
            
            // use a given timezone offset if it exists
            if (opts.xaxis.tzOffset) {
                newDate = new Date(date.getTime() - opts.xaxis.tzOffset);
            } else {
                newDate = date.toUTCString();
                newDate = newDate.substr(0, newDate.length - 4);
                newDate = new Date(newDate);
            }
            
            return newDate;
        };
        
        var _snap = function(range, axis, startDate) {
            var end, hour, month, year;
            switch (range) {
                case "hour":
                    // go to the start of the hour
                    hour = startDate.getHours();
                    startDate.clearTime().addHours(hour);
                    end = MS_1HOUR;
                    break;
                case "day":
                    // go to the start of the day
                    startDate.clearTime();
                    end = MS_1DAY;
                    break;
                case "week":
                    // go to the last sunday if we are already past sunday
                    if (!startDate.is().sunday()) {
                        startDate = startDate.last().sunday();
                    }

                    // jump to day start
                    startDate.clearTime();
                    end = MS_1WEEK;
                    break;
                case "month":
                    // go to the start of the month
                    startDate.clearTime();
                    startDate.moveToFirstDayOfMonth();
                    end = startDate.getDaysInMonth() * MS_1DAY;
                    break;
                case "year":
                    if (!startDate.is().january()) startDate.last().january();

                    startDate.moveToFirstDayOfMonth().clearTime();
                    end = 365 * MS_1DAY;
                    break;
            }

            // don't allow navigating beyond the current time
            if (startDate.compareTo(new Date()) > 0) return { min: axis.min, max: axis.max  };
            
            axis.min = startDate.getTime() + plot.getAxes().xaxis.options.tzOffset;
            axis.max = axis.min + end;

            plot.setupGrid();
            plot.draw();

            return { min: axis.min, max: axis.max };
        };

        var _next = function(range, startDate, direction) {
            var dir;

            if (direction == "left") dir = -1;
            else dir = 1;

            switch (range) {
                case "hour":
                    hour = startDate.getHours();
                    startDate.clearTime().addHours(hour + dir);
                    break;
                case "day":
                    startDate.clearTime().addDays(dir);
                    break;
                case "week":
                    // go to the last sunday if we are already past sunday
                    if (!startDate.is().sunday()) {
                        startDate = startDate.last().sunday();
                    }
                    startDate.clearTime().addWeeks(dir);
                    break;
                case "month":
                    startDate.clearTime().moveToFirstDayOfMonth().addMonths(dir);
                    break;
                case "year":
                    if (!startDate.is().january()) startDate.last().january();

                    startDate.moveToFirstDayOfMonth().clearTime().addYears(dir);
                    break;
            }
        };
        
        plot.nextRange = function(range, xNum) {
            var startDate, end, xaxis, opts = plot.getOptions(), hour;

            if (!opts.xaxes[xNum]) return;

            xaxis = opts.xaxes[xNum];
            startDate = new Date(xaxis.min);
            startDate  = _stripTimezone(startDate);
            _next(range, startDate, "right");
            
            return _snap(range, xaxis, startDate);
        };

        plot.prevRange = function(range, xNum) {
            var startDate, end, xaxis, opts = plot.getOptions(), hour;

            if (!opts.xaxes[xNum]) return;

            xaxis = opts.xaxes[xNum];
            startDate = new Date(xaxis.min);
            startDate  = _stripTimezone(startDate);
            _next(range, startDate, "left");
            
            return _snap(range, xaxis, startDate);
        };

        plot.now = function(range, xNum) {
            var startDate, end, xaxis, opts = plot.getOptions();            
            
            if (!opts.xaxes[xNum]) return;

            xaxis = opts.xaxes[xNum];
            startDate = new Date();
            return _snap(range, xaxis, startDate);
        };

        plot.snapTo = function(range, xNum) {
            var startDate, end, xaxis, month, year, opts = plot.getOptions();
            
            if (!opts.xaxes[xNum]) return;

            xaxis = opts.xaxes[xNum];
            startDate = new Date(xaxis.min);
            startDate  = _stripTimezone(startDate);
            
            return _snap(range, xaxis, startDate);
        };

    }

    var options = {
    };
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "snap",
        version: "0.1"
    });
})(jQuery);
