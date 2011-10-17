/**
 * Flot plugin for caching time series data using ajax.
 *
 * @author Joel Oughton
 */
// time constants
var MS_1HOUR = 60 * 60 * 1000;// 1 hour
var MS_1DAY = MS_1HOUR * 24; // 1 day
var MS_1WEEK = MS_1DAY * 7; // 1 week
var MS_1MONTH = MS_1DAY * 31; // the max month    
var MAX_RANGE = MS_1MONTH * 3;// max graph range
var MIN_RANGE = MS_1HOUR; // min graph range
(function($){
    function init(plot){
        function checkCachingMode(plot, options){
            if (options.caching.enabled && options.caching.dataGrabber == null) {
                var dataGrabber = new DataGrabber(plot.getPlaceholder(), options);
                dataGrabber.firstRun();
                
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
            maxReqSize: MS_1MONTH,
            tzOffset: 0,
            dataFunction: null,
            urlFunction: null
        }
    };
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: "cacher",
        version: "0.1"
    });
})(jQuery);

/**
 *  Data gathering and processing class
 */
function DataGrabber(container, options){
    this.options = options;
    this.container = container;
    this.cache = []; // data points store
    this.tzConverter = new TzConverter(options.caching.tzOffset); // time zone conversion object
    // coordinates
    this.dxMin = options.xaxis.min; // left most x data point
    this.dxMax = options.xaxis.max; // right most x data point
    this.prevRange = this.dxMax - this.dxMin; // the last graph's x range
    // request arrays
    this.ajaxRequests = [];
    this.stateStore = {};
    
    // set our starting binsize
    this.curBin = this.getBinSize(this.dxMin, this.dxMax);
}

/**
 *  Processes pan requests
 */
DataGrabber.prototype.panRequest = function(xMin, xMax, panRight){
    var preload = (xMax - xMin) / this.options.caching.preloadDivider;
    var reqMin;
    var reqMax;
    
    if (xMin < this.dxMin || xMax > this.dxMax) {
        if (panRight) {
            reqMin = this.dxMax;
            reqMax = xMax + preload;
        } else {
            reqMin = xMin - preload;
            reqMax = this.dxMin;
        }
        
        this.makeRequests(this.buildRequests(reqMin, reqMax, panRight));
    }
}

/**
 *  Processes zoom requests
 */
DataGrabber.prototype.zoomRequest = function(xMin, xMax){
    var range = xMax - xMin;
    
    if (range == this.prevRange) {
        return;
    }
    
    // see if we need to force a reload
    if (range < this.prevRange / this.options.caching.zoomTol ||
    range > this.prevRange * this.options.caching.zoomTol ||
    this.ajaxRequests.length != 0) {
        this.forceReload(xMin, xMax);
        this.firstRun();
        
    } else {
        // just load a bit of data to the right and/or left
        if (xMax > this.dxMax) {
            this.panRequest(xMin, xMax, true);
        }
        
        if (xMin < this.dxMin) {
            this.panRequest(xMin, xMax, false);
        }
    }
}

/**
 *  Splits requests up into manageable sizes
 */
DataGrabber.prototype.buildRequests = function(xMin, xMax, panRight){
    var curRange = xMax - xMin;
    var req = []; // array of split up requests
    // nothing to add if no appropriate data range
    if (curRange < this.options.caching.binSizeMin) 
        return [];
    
    // number of requests needed
    var noReq = Math.ceil(curRange / this.options.caching.maxReqSize);
    
    // build the requests
    for (var i = 0; i < noReq; i++) {
        min = xMin + this.options.caching.maxReqSize * i;
        max = xMin + this.options.caching.maxReqSize * (i + 1);
        
        // don't go any further than we have to
        if (max > xMax) 
            max = xMax;
        
        // build up the request
        obj = new Object();
        obj['min'] = min;
        obj['max'] = max;
        obj['panRight'] = panRight;
        req[i] = obj;
        
        // loop once if we don't need do any splitting
        if (curRange <= this.options.caching.maxReqSize) 
            break;
    }
    
    return req;
}

/**
 * Process received data
 */
DataGrabber.prototype.dataBack = function(data) {
    // check if we got a dataset back
    if (!data || !data.sets) {
        return;
    }
   
    var sets = data.sets, reqCur = this.stateStore[data.identity.min][data.identity.max];
 
    for (var set in sets) {
        if (!this.cache[set]) {
            this.cache[set] = [];
            this.cache[set].data = sets[set].data;
            for (var prop in sets[set]) {
                if (prop == "data") {
                    continue;
                }
                this.cache[set][prop] = sets[set][prop];
            }
        } else {
            if (reqCur.panRight) {
                this.cache[set].data = this.cache[set].data.concat(sets[set].data);
            } else {
                this.cache[set].data = sets[set].data.concat(this.cache[set].data);
            }
            this.cache[set].data.sort(function(a, b) {
                if (a[0] > b[0]) return 1;
                if (a[0] < b[0]) return -1;
                return 0;
            });
        }
    }
    
    // get the new min and max x values
    this.dxMin = Math.min(data.bounds.min, this.dxMin);
    this.dxMax = Math.max(data.bounds.max, this.dxMax);
    
    // notify listeners that we have new data
    this.container.trigger("cacherarrived", [this.getSeries()]);
}

/**
 *  Do the actually data requesting
 */
DataGrabber.prototype.makeRequests = function(newRequests){
    if (newRequests.length < 1) {
        return;
    }
    
    var reqCur = newRequests.pop(), reqIndex, 
        max = Math.round(reqCur.max / 1000), min = Math.round(reqCur.min / 1000);

    if (!this.stateStore[min]) this.stateStore[min] = {};

    this.stateStore[min][max] = reqCur;
    this.container.trigger("cacherbusy");
    
    // getting the data is the dataFunction's job
    this.options.caching.dataFunction(min, max, Math.round(this.curBin / 1000), this, this.dataBack);
    //this.checkCache(reqCur.panRight);    // need to re implement this
            
    for (var i = 0; i < this.ajaxRequests.length; i++) {
        var req = this.ajaxRequests[i];
        
        if (req == XMLHttpRequest) {
            reqIndex = i;
            break;
        }
    }
    
    this.ajaxRequests.splice(reqIndex, 1);
    
    if (this.ajaxRequests < 1) {
        this.container.trigger("cacherfree");
    }
    
    this.makeRequests(newRequests);
}

/**
 * Merge all the waiting requests into bigger blocks
 */
DataGrabber.prototype.concatWaiting = function(requests, curMin, curMax){
    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;
    var newRequests = [];
    
    // check if there is work to do
    if (requests.length < 2) {
        return requests;
    }
    
    // find the min and max x data points
    for (var i = 0; i < requests.length; i++) {
        var req = requests[i];
        
        if (req.panRight) {
            max = Math.max(req.max, max);
        } else {
            min = Math.min(req.min, min);
        }
    }
    
    // make new requests from min and max
    if (min < curMin) {
        newRequests = newRequests.concat(this.buildRequests(min, curMin, false));
    }
    
    if (max > curMax) {
        newRequests = newRequests.concat(this.buildRequests(curMax, max, true));
    }
    
    return newRequests;
}

/**
 * Clears the data cache and waiting requests
 */
DataGrabber.prototype.clearData = function(){
    for (var i = 0; i < this.ajaxRequests.length; i++) {
        this.ajaxRequests[i].abort();
    }
    
    this.cache = [];
    this.ajaxRequests = [];
}

/**
 * Prepares class state for new, different data
 */
DataGrabber.prototype.forceReload = function(min, max){
    this.curBin = this.getBinSize(min, max);
    this.clearData();
    this.dxMin = min;
    this.dxMax = max;
    this.prevRange = max - min;
}

/**
 * Checks all the series and limits them to the max cache size
 */
DataGrabber.prototype.checkCache = function(panRight){
    var trim;
    var leftPos, rightPos;
    
    // loop through the series
    for (key in this.cache) {
        var serie = this.cache[key];
        var size = serie.length;
        
        // check if the limit has been reached
        if (size > this.CACHE_SIZE_MAX) {
        
            if (panRight) {
                leftPos = serie[this.CACHE_SIZE_MAX / 2][0];
                rightPos = serie[serie.length - 1][0];
                trim = true;
                break;
            } else {
                rightPos = serie[this.CACHE_SIZE_MAX / 2][0];
                leftPos = serie[0][0];
                trim = true;
                break;
            }
        }
    }
    
    // is there a cache limit breach
    if (!trim) 
        return;
    
    // find the positions in the array that we need to trim
    for (key in this.cache) {
        var lower = 0;
        var upper = 0;
        var foundLower = false;
        var foundUpper = false;
        
        for (var i = 0; i < this.cache[key].length; i++) {
            var d = this.cache[key][i][0];
            
            if (!foundUpper && d >= rightPos) {
                upper = i;
                foundUpper = true;
            }
            
            if (!foundLower && d >= leftPos) {
                lower = i;
                foundLower = true;
            }
        }
        
        if (!foundLower) {
            lower = 0;
            upper = 0;
        } else 
            if (!foundUpper) {
                upper = this.cache[key].length;
            }
        
        // finally trim this array
        this.cache[key] = this.cache[key].slice(lower, upper);
    }
}

/**
 * Recalculates and returns the new bin size
 */
DataGrabber.prototype.getBinSize = function(min, max){
    // calculate the bin size in seconds
    var bin = (max - min) / this.options.caching.binDivider;
    
    // limit the min bin size to the absolute min
    if (bin < this.options.caching.binSizeMin) 
        bin = this.options.caching.binSizeMin;
    
    return bin;
}

/**
 * Gets data using initial options
 * This probably only needs to be run after creating an instance
 * of this class.
 */
DataGrabber.prototype.firstRun = function(){
    this.makeRequests(this.buildRequests(this.dxMin, this.dxMax, false));
}

/**
 * Some getter and setter methods so we don't have to access
 * the variables directly.
 */
DataGrabber.prototype.getStatus = function(){
    return (this.ajaxRequests.length);
}

DataGrabber.prototype.getSeries = function(){
    var series = [];
    
    for (var set in this.cache) {
        series.push(this.cache[set]);
    }
    
    return series;
}

DataGrabber.prototype.getMinX = function(){
    return this.dxMin;
}

DataGrabber.prototype.getMaxX = function(){
    return this.dxMax;
}

DataGrabber.prototype.getCurBin = function(){
    return this.curBin;
}


/**
 * Helper classses
 */
/**
 A time zone conversion class for making simple UTC timestamp
 changes.
 
 Changes to the timestamp are just done by adding or subtracting
 the given offset.
 */
/**
 * TzConverter Constructor.
 * tzOffset is the difference between UTC and local time
 * ie. current local timestamp - currrent UTC timestamp
 */
function TzConverter(tzOffset){
    this.offset = tzOffset;
}

TzConverter.prototype.toUtc = function(localTime){
    return localTime - this.offset;
}

TzConverter.prototype.toLocal = function(utcTime){
    return utcTime + this.offset;
}

TzConverter.prototype.toLocalArray = function(data){
    for (key in data) {
        if (data[key][0] != null) 
            data[key][0] = this.toLocal(data[key][0]);
    }
}
