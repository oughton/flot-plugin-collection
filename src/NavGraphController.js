(function($) {
    function NavGraphController(flotContainer, flotOptions){
        var _thisNavGraphController = this;
        
        var _flot;
        var _flotContainer = flotContainer;
        var _flotOptions = flotOptions;
        var _flotSeries = [];
        var _selected;
        
        var _prevRange = {
            xaxis: {
                min: _flotOptions.xaxis.min,
                max: _flotOptions.xaxis.max
            }
        };
        
        this.mergeOptions = function(options, deep){
            _flotOptions = $.extend(deep, {}, _flotOptions, options);
        };
        
        this.setSeries = function(series){
            _flotSeries = series;
        };
        
        this.setSelected = function(selected){
            _selected = selected;
        }
        
        this.getGraphRange = function(){
            return _flot.getAxes();
        };
        
        this.drawSelected = function(selected){
            _flot.setDataSelected(_flotSeries, selected);
        };
        
        this.draw = function(){
            if (_flot) {
                _flot.drawSelected(_flotSeries, _selected);
                _saveRange();
            } else {
                _flot = $.plot(_flotContainer, _flotSeries, _flotOptions);
                _flot.drawSelected(_flotSeries, _selected);
                _flotOptions.caching.dataGrabber = _flot.getOptions().caching.dataGrabber;

                _flotContainer.trigger("plotredraw");
            }

            // initially pan to set the axes min and max
            _flot.pan({ left: 0, top: 0 });
            
            _flot.triggerRedrawOverlay();
        };
        
        this.invalidate = function(){
            _flot = undefined;
            _thisNavGraphController.draw();
        };
        
        /**
        * Rescale the y axis
        */
        this.autoScale = function(){
            return _flot.autoScale();
        }
        
        this.panRequest = function(min, max){
            var panRight;
            var dataGrabber = _flot.getOptions().caching.dataGrabber;
            
            // determine the pan direction
            if (min < _prevRange.xaxis.min) {
                panRight = false;
            } else {
                panRight = true;
            }
            
            // we are ready to send the request away
            dataGrabber.panRequest(min, max, panRight);
            
            // store the previous range
            _prevRange = {
                xaxis: {
                    min: min,
                    max: max
                }
            };
            _triggerMove();
            return dataGrabber.getStatus();
        };
        
        this.zoomRequest = function(min, max){
            var dataGrabber = _flot.getOptions().caching.dataGrabber;
            dataGrabber.zoomRequest(min, max);
            _triggerMove();
            return dataGrabber.getStatus();
        };
        
        this.zoomOut = function(){
            _flot.zoomOut();
            _triggerMove();
        };
        
        this.zoom = function(){
            _flot.zoom();
            _triggerMove();
        };
        
        this.pan = function(offset){
            _flot.pan(offset);
            _triggerMove();
        };
        
        this.moveTo = function(args) {
            _flot.moveTo(args);
            if (args.xaxis) {
                _thisNavGraphController.zoomRequest(args.xaxis.min, args.xaxis.max);
            }
            _triggerMove();
        }
        
        var _saveRange = function(){
            var axes = _flot.getAxes();
            
            _thisNavGraphController.mergeOptions({
                xaxis: {
                    min: axes.xaxis.min,
                    max: axes.xaxis.max
                },
                yaxis: {
                    min: axes.yaxis.min,
                    max: axes.yaxis.max
                }
            }, true);
        };
        
        var _triggerMove = function() {
            _flotContainer.trigger("plotmove", [_flot.getUsedAxes()]);
            _flot.triggerRedrawOverlay();
        };
        
        var _initialise = function(){
            _thisNavGraphController.invalidate();
        };
        
        _initialise();
    }
    
    $.navctrl = function(flotContainer, flotOptions) {
            return new NavGraphController($(flotContainer), flotOptions);
    };
})(jQuery);
