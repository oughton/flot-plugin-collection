/**
 * 
 *  DateJs included here minified for convenience (http://www.datejs.com/)
 *
 * Version: 1.0 Alpha-1 
 * Build Date: 13-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|after|from)/i,subtract:/^(\-|before|ago)/i,yesterday:/^yesterday/i,today:/^t(oday)?/i,tomorrow:/^tomorrow/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^min(ute)?s?/i,hour:/^h(ou)?rs?/i,week:/^w(ee)?k/i,month:/^m(o(nth)?s?)?/i,day:/^d(ays?)?/i,year:/^y((ea)?rs?)?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a|p)/i},abbreviatedTimeZoneStandard:{GMT:"-000",EST:"-0400",CST:"-0500",MST:"-0600",PST:"-0700"},abbreviatedTimeZoneDST:{GMT:"-000",EDT:"-0500",CDT:"-0600",MDT:"-0700",PDT:"-0800"}};
Date.getMonthNumberFromName=function(name){var n=Date.CultureInfo.monthNames,m=Date.CultureInfo.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.getDayNumberFromName=function(name){var n=Date.CultureInfo.dayNames,m=Date.CultureInfo.abbreviatedDayNames,o=Date.CultureInfo.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.isLeapYear=function(year){return(((year%4===0)&&(year%100!==0))||(year%400===0));};Date.getDaysInMonth=function(year,month){return[31,(Date.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};Date.getTimezoneOffset=function(s,dst){return(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()]:Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];};Date.getTimezoneAbbreviation=function(offset,dst){var n=(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST:Date.CultureInfo.abbreviatedTimeZoneStandard,p;for(p in n){if(n[p]===offset){return p;}}
return null;};Date.prototype.clone=function(){return new Date(this.getTime());};Date.prototype.compareTo=function(date){if(isNaN(this)){throw new Error(this);}
if(date instanceof Date&&!isNaN(date)){return(this>date)?1:(this<date)?-1:0;}else{throw new TypeError(date);}};Date.prototype.equals=function(date){return(this.compareTo(date)===0);};Date.prototype.between=function(start,end){var t=this.getTime();return t>=start.getTime()&&t<=end.getTime();};Date.prototype.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};Date.prototype.addSeconds=function(value){return this.addMilliseconds(value*1000);};Date.prototype.addMinutes=function(value){return this.addMilliseconds(value*60000);};Date.prototype.addHours=function(value){return this.addMilliseconds(value*3600000);};Date.prototype.addDays=function(value){return this.addMilliseconds(value*86400000);};Date.prototype.addWeeks=function(value){return this.addMilliseconds(value*604800000);};Date.prototype.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,this.getDaysInMonth()));return this;};Date.prototype.addYears=function(value){return this.addMonths(value*12);};Date.prototype.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.millisecond||x.milliseconds){this.addMilliseconds(x.millisecond||x.milliseconds);}
if(x.second||x.seconds){this.addSeconds(x.second||x.seconds);}
if(x.minute||x.minutes){this.addMinutes(x.minute||x.minutes);}
if(x.hour||x.hours){this.addHours(x.hour||x.hours);}
if(x.month||x.months){this.addMonths(x.month||x.months);}
if(x.year||x.years){this.addYears(x.year||x.years);}
if(x.day||x.days){this.addDays(x.day||x.days);}
return this;};Date._validate=function(value,min,max,name){if(typeof value!="number"){throw new TypeError(value+" is not a Number.");}else if(value<min||value>max){throw new RangeError(value+" is not a valid value for "+name+".");}


/**
 * Flot plugin for snapping the xaxis to predefined time ranges.
 *
 * @author Joel Oughton
 *
 * This plugin adds four public functions to the flot API
 *  > nextRange, prevRange, now and snapTo
 *
 *  Each of these function take two of the same parameters: range and xNum.
 *
 *  xNum = the xaxis number (0, 1, 2, ...)
 *    in most cases this will be 0 unless you have multiple xaxis'
 *
 *  range = the time range for snapping.
 *    possible values are: hour, day, week, month or year
 *
 *  eg.
 *        nextRange("week", 0)  - will move the xaxis time range to
 *                                one week in the future.
 *
 *        now("day", 0)         - will snap the time range to the start
 *                                of the current day (midnight).
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
