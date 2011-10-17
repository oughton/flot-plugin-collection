/**
 * Flot plugin for caching time series data using ajax.
 *
 * @author Joel Oughton
 */
// time constants
var MS_1HOUR = 60 * 60 * 1000;// 1 hour
var MS_1DAY = MS_1HOUR * 24;  // 1 day
var MS_1WEEK = MS_1DAY * 7;   // 1 week
var MS_1MONTH = MS_1DAY * 31; // the max month   
var MS_1YEAR = MS_1DAY * 365; // 1 year
var MAX_RANGE = MS_1MONTH * 12;// max graph range
var MIN_RANGE = MS_1HOUR;     // min graph range

(function($){
    function init(plot){
        function checkCachingMode(plot, options){
            if (options.caching.enabled && options.caching.dataGrabber == null) {
                var dataGrabber = new Cacher(plot.getPlaceholder(), options);
                
                options.caching.dataGrabber = dataGrabber;
            }
        }
        
        plot.hooks.processOptions.push(checkCachingMode);
    }
    
    var options = {
        caching: {
            dataGrabber: null,
            enabled: false,
            maxSize: 1000,
            preloadDivider: 1,
            zoomTol: 1.5,
            binSizeMin: 0,
            binDivider: 288.0,
            maxReqSize: MS_1MONTH * 3,
            requestRate: 1000,
            dataFunction: null,
            urlFunction: null,
            boundaries: { 
                startTime: Math.round(( (new Date().getTime() - MS_1YEAR * 5))),
                endTime: Math.round(( (new Date().getTime() + MS_1DAY)))
            }
        }
    };
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "cacher",
        version: "0.1"
    });
})(jQuery);

function Cacher(container, options) {
    var _thisCacher = this;
    var _cache = {}, _bounds, _binsize, _previousZoomRange;
    var _options = options;
    var _container = container;
    var _rf = new RequestFunctions();
    var _rb = new RequestBuffer(options.caching.requestRate);
    
    var _dataBack = function() {
        var series = _rf.requestsToData(
            _cache, _bounds.min, _rf.binToRequestSize(_binsize, _options.caching.maxReqSize, _options.caching.binDivider));
            
        // notify and pass flot that new data is ready to draw
        if (series.length > 0) _container.trigger("cacherarrived", [ series ]);
    };
    
    var _expandBounds = function(min, max) {
        var requestSize, response, start = min, end = max;
        
        requestSize = _rf.binToRequestSize(_binsize, _options.caching.maxReqSize, _options.caching.binDivider);

        response = _rf.rangeToRequests(
            start, end, requestSize, _binsize, _options.caching.dataFunction, _dataBack, this);
        
        // merge the cache into the requests
        // this effectively only uses the requests that aren't already in the cache
        _cache = $.extend({}, response.requests, _cache);
        _bounds.min = Math.min(response.range.min, _bounds.min);
        _bounds.max = Math.max(response.range.max, _bounds.max);
        
        // make the requests
        $.each(_cache, function(key, request) {
            if (!request.sent()) {
                // only buffer when we start getting greedy
                if (Math.abs(max - min) >= MS_1MONTH) {
                    _rb.queue(request);
                } else {
                    request.send();
                }
            }
        });
    };
    
    var _initialise = function() {
        _bounds = { min: _options.xaxis.min, max: _options.xaxis.max };
        _previousZoomRange = _bounds.max - _bounds.min;

        _binsize = _rf.rangeToBin(
            _bounds.max - _bounds.min, 0, 0, 0, _options.caching.binDivider, _options.caching.binSizeMin);

        _expandBounds(_bounds.min, _bounds.max);

        setInterval(function() {
            if (_thisCacher.getStatus()) {
                _container.trigger("cacherbusy");
            } else {
                _container.trigger("cacherfree");
            }
        }, 250);
    };
    
    _initialise();
    
    this.moveTo = function(min, max) {
        var newBinsize, range;
        
        // limit our requests to the absolute request boundaries
        min = Math.round(min);
        max = Math.round(max);
        range = max - min;
        
        newBinsize = _rf.rangeToBin(
            range, 
            _previousZoomRange, 
            _options.caching.zoomTol,
            _binsize,
            _options.caching.binDivider,
            _options.caching.binSizeMin
        );
       
        // limit our requests to the absolute request boundaries
        min = Math.max(_options.caching.boundaries.startTime, min);
        max = Math.min(_options.caching.boundaries.endTime, max);

        // check for a compulsory reload
        if (newBinsize != _binsize) {
            _rb.clear();
            
            // clear the cache
            $.each(_cache, function(key, request) {
                request.clear();
            });
            _cache = {};

            _bounds.min = min;
            _bounds.max = max;
            _previousZoomRange = max - min;
            _binsize = newBinsize;
            _expandBounds(min, max);
        } else {

            // only try make more requests if we have to
            if (min < _bounds.min || max > _bounds.max) { 
                
                if (min < _bounds.min) {
                    start = _bounds.min;
                    end = min;
                    _expandBounds(start, end);
                } 

                if (max > _bounds.max) {
                    start = _bounds.max;
                    end = max;
                    _expandBounds(start, end);
                }
            }
        }
    };

    this.getStatus = function() { 
        return _rf.checkBusy(_cache, _bounds.min, _rf.binToRequestSize(_binsize, _options.caching.maxReqSize, _options.caching.binDivider));
    };
}

function RequestFunctions() {
    
    this.checkBusy = function(requests, start, requestSize) {
        var request = requests[start];
        var iterator = this.nextRequestTime(start, requestSize);
        
        while (request) {
            if ((!request.serviced() && !request.failed()) || !request.sent()) { 
                return true;
            }

            request = requests[iterator];
            iterator = this.nextRequestTime(iterator, requestSize);
        }
        return false;
    };
    
    this.requestsToData = function(requests, start, requestSize) {
        var request = requests[start], series = [], props, i = 0, keysVals = {};
        var iterator = this.nextRequestTime(start, requestSize);
        
        while (request) {
            if (!request.serviced()) {
                iterator = this.nextRequestTime(iterator, requestSize);
                request = requests[iterator];
                continue;
            }

            $.each(request.data(), function(url, sets) {
                
                $.each(sets, function(key, serie) {
                    var id = url + "_" + key;
                    if (!keysVals[id]) {
                        series.push({ data: [] });
                        props = series[i];
                        keysVals[id] = props;
                        i++;
                    } else {
                        props = keysVals[id];
                    }

                    $.each(serie, function(prop, val) {
                        if (prop != "data") props[prop] = val;
                        else props[prop] = props[prop].concat(val);
                    });
                });

            });

            request = requests[iterator];
            iterator = this.nextRequestTime(iterator, requestSize);
        }
        return series;
    };
    
    this.rangeToRequests = function(start, end, requestSize, bin, dataFunction, callback, context, boundaries) {
        var min = start, max = start, bounds, requests = {}, range = {};
        
        // the split is going left
        if (start - end > 0) {
            range.max = min;
            requests[min] = new Request(
                min, this.nextRequestTime(min, requestSize), bin, dataFunction, callback, context);
            while (min > end) {
                max = min;
                min = this.prevRequestTime(min, requestSize);
                
                requests[min] = new Request(min, max, bin, dataFunction, callback, context);
            }
            range.min = min;
        
        // the split is going right
        } else {
            range.min = min;
            while (min < end) {
                min = max;
                max = this.nextRequestTime(min, requestSize);
                
                requests[min] = new Request(min, max, bin, dataFunction, callback, context);
            }
            range.max = min;
        }
        
        return { range: range, requests: requests };
    };
    
    this.nextRequest = function(time, requestSize, bin, dataFunction, callback, context) {
        var min = this.nextRequestTime(time, requestSize);
        var max = min + this.nextRequestTime(time, requestSize);
        return req = new Request(min, max, bin, dataFunction, callback, context);
    };
    
    this.nextRequestTime = function(time, requestSize) {
        return time + requestSize;
    };
    
    this.prevRequestTime = function(time, requestSize) {
        return time - requestSize;
    };
    
    this.binToRequestSize = function(bin, maxRequestSize, binDivider) {
        var rs;
        
        rs = binDivider * bin;

        //if (bin <= 300000) rs = MS_1DAY;                // 1 day
        //else if (bin <= 9300000) rs = MS_MS_1MONTH;     // 1 month
        //else if (bin <= 55800000) rs = MS_1MONTH * 18;  // 6 months
        //else rs = MAX_RANGE;                            // > 6 months
        
        // don't go above the maximum request size
        if (maxRequestSize && rs > maxRequestSize)
            rs = maxRequestSize;
            
        return rs;
    };
    
    this.rangeToBin = function(range, prevRange, tolerance, prevBin, binDivider, minBin) {
        var bin = prevBin;
        
        // only change bin when the tolerance is exceeded
        if (Math.max(range, prevRange) / Math.min(range, prevRange) > tolerance) {
            bin = range / binDivider;
        }
        
        // don't go below the minumum binsize
        if (bin < minBin) bin = minBin;
        
        return Math.round(bin);
    };
}

function RequestBuffer(delay) {
    var _delay = delay;
    var _queue = [];
    var _active = false;
    var _poll;
    
    /**
     * Create a timeout to poll each queue member
     */
    var _begin = function() {
        _poll = setInterval(function() {
            if (_queue.length < 1) {
                clearInterval(_poll);
                _active = false;
            } else {
                _queue.pop().send();
            }
        }, _delay);
    };
    
    /**
     * Queue's a request in the buffer
     *
     * @param request
     *          the request to be queued
     */
    this.queue = function(request) { 
        if (request) _queue.splice(0, 0, request);
        if (!_active) _begin();
        _active = true;
    };

    this.clear = function() {
        if (_active) clearInterval(_poll);
        _queue = [];
        _active = false;
    };
    
    this.active = function() { return _active; };
}

function Request(min, max, bin, dataFunction, callback, context) {
    var _thisRequest = this;
    var MAX_ATTEMPTS = 1;           // max request attempts
    var RESPONSE_TIMEOUT = 1000;    // response timeout 
    var _attempts = 0;
    var _dataFunction = dataFunction;
    var _identity = { min: min, max: max, bin: bin };
    var _callback = callback;
    var _context = context;
    var _timer = -1;
    var _data;
    
    if (!min || !max || !bin || !dataFunction)
        throw "Require all request params";

    var _clear = function() {
        _attempts = 0;
        _data = undefined;
        _thisRequest.cancel();
    };
    
    var _dataBack = function(pack) {

        // discard any late responses
        if (!this.serviced()) { 
            this.data(pack.data);
            _callback.call(_context);
        }
    };

    this.data = function(data) {
        if (!data) return _data;
        _data = data;
    };
    
    this.serviced = function() { return _data != undefined; };
    this.failed = function() { return _attempts >= MAX_ATTEMPTS; };
    this.cancel = function() { clearTimeout(_timer); _timer = -1; };
    this.clear = function() { _clear(); };
    this.outstanding = function() { return _timer != -1 && _data == undefined; };
    this.identity = function() { return _identity; };
    this.sent = function() { return this.serviced() || this.failed() || this.outstanding(); };
    
    this.error = function() {
        _data = undefined;
        _attempts += 1;
      
        if (_attempts < MAX_ATTEMPTS) this.send();
    };
    
    this.send = function() {
        var that = this;

        var pack = {
            identity: _identity,
            context: this,
            data : { }
        };
        
        _dataFunction(Math.round(min / 1000), Math.round(max / 1000), Math.round(bin / 1000), _dataBack, pack);

        _timer = setTimeout(function() {
            if (!_data) {
                that.error();
            }
        }, RESPONSE_TIMEOUT);
    }
}

