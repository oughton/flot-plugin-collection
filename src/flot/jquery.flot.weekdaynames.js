/**
 * JsDate minified
 */
var vbGeneralDate=0,vbLongDate=1,vbShortDate=2,vbLongTime=3,vbShortTime=4;var vbUseSystemDayOfWeek=0,vbSunday=1,vbMonday=2,vbTuesday=3,vbWednesday=4,vbThursday=5,vbFriday=6,vbSaturday=7;var vbUseSystem=0,vbFirstJan1=1,vbFirstFourDays=2,vbFirstFullWeek=3;Date.MonthNames=[null,"January","February","March","April","May","June","July","August","September","October","November","December"];Date.WeekdayNames=[null,"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.IsDate=function(a){return !isNaN(new Date(a))};Date.CDate=function(e){if(Date.IsDate(e)){return new Date(e)}var b=e.replace(/\-/g,"/").replace(/\./g,"/").replace(/ /g,"/");b=b.replace(/pm$/i," pm").replace(/am$/i," am");if(Date.IsDate(b)){return new Date(b)}var a=b+"/"+new Date().getUTCFullYear();if(Date.IsDate(a)){return new Date(a)}if(b.indexOf(":")){var d=b.replace(/ /,"/"+new Date().getUTCFullYear()+" ");if(Date.IsDate(d)){return new Date(d)}var c=new Date().toDateString()+" "+e;if(Date.IsDate(c)){return new Date(c)}}return false};Date.DateAdd=function(c,a,d){if(!Date.CDate(d)){return"invalid date: '"+d+"'"}if(isNaN(a)){return"invalid number: '"+a+"'"}a=new Number(a);var b=Date.CDate(d);switch(c.toLowerCase()){case"yyyy":b.setUTCFullYear(b.getUTCFullYear()+a);break;case"q":b.setUTCMonth(b.getUTCMonth()+(a*3));break;case"m":b.setUTCMonth(b.getUTCMonth()+a);break;case"y":case"d":case"w":b.setUTCDate(b.getUTCDate()+a);break;case"ww":b.setUTCDate(b.getUTCDate()+(a*7));break;case"h":b.setUTCHours(b.getUTCHours()+a);break;case"n":b.setUTCMinutes(b.getUTCMinutes()+a);break;case"s":b.setUTCSeconds(b.getUTCSeconds()+a);break;case"ms":b.setUTCMilliseconds(b.getUTCMilliseconds()+a);break;default:return"invalid interval: '"+c+"'"}return b};Date.DateDiff=function(s,e,c,r){if(!Date.CDate(e)){return"invalid date: '"+e+"'"}if(!Date.CDate(c)){return"invalid date: '"+c+"'"}r=(isNaN(r)||r==0)?vbSunday:parseInt(r);var q=Date.CDate(e);var p=Date.CDate(c);if("h,n,s,ms".indexOf(s.toLowerCase())==-1){if(e.toString().indexOf(":")==-1){q.setUTCHours(0,0,0,0)}if(c.toString().indexOf(":")==-1){p.setUTCHours(0,0,0,0)}}var n=p.valueOf()-q.valueOf();var l=new Date(n);var h=p.getUTCFullYear()-q.getUTCFullYear();var m=p.getUTCMonth()-q.getUTCMonth()+(h!=0?h*12:0);var j=parseInt(m/3);var b=n;var i=parseInt(n/1000);var o=parseInt(i/60);var k=parseInt(o/60);var g=parseInt(k/24);var a=parseInt(g/7);if(s.toLowerCase()=="ww"){var d=Date.DatePart("w",q,r)-1;if(d){q.setUTCDate(q.getUTCDate()+7-d)}var d=Date.DatePart("w",p,r)-1;if(d){p.setUTCDate(p.getUTCDate()-d)}var f=Date.DateDiff("w",q,p)+1}switch(s.toLowerCase()){case"yyyy":return h;case"q":return j;case"m":return m;case"y":case"d":return g;case"w":return a;case"ww":return f;case"h":return k;case"n":return o;case"s":return i;case"ms":return b;default:return"invalid interval: '"+s+"'"}};Date.DatePart=function(c,d,b){if(!Date.CDate(d)){return"invalid date: '"+d+"'"}var a=Date.CDate(d);switch(c.toLowerCase()){case"yyyy":return a.getUTCFullYear();case"q":return parseInt(a.getUTCMonth()/3)+1;case"m":return a.getUTCMonth()+1;case"y":return Date.DateDiff("y","1/1/"+a.getUTCFullYear(),a)+1;case"d":return a.getUTCDate();case"w":return Date.Weekday(a.getUTCDay()+1,b);case"ww":return Date.DateDiff("ww","1/1/"+a.getUTCFullYear(),a,b)+1;case"h":return a.getUTCHours();case"n":return a.getUTCMinutes();case"s":return a.getUTCSeconds();case"ms":return a.getUTCMilliseconds();default:return"invalid interval: '"+c+"'"}};Date.MonthName=function(b,a){if(isNaN(b)){if(!Date.CDate(b)){return"invalid month: '"+b+"'"}b=DatePart("m",Date.CDate(b))}var c=Date.MonthNames[b];if(a==true){c=c.substring(0,3)}return c};Date.WeekdayName=function(a,d,b){if(isNaN(a)){if(!Date.CDate(a)){return"invalid weekday: '"+a+"'"}a=DatePart("w",Date.CDate(a))}b=(isNaN(b)||b==0)?vbSunday:parseInt(b);var c=((b-1+parseInt(a)-1+7)%7)+1;var e=Date.WeekdayNames[c];if(d==true){e=e.substring(0,3)}return e};Date.Weekday=function(a,b){b=(isNaN(b)||b==0)?vbSunday:parseInt(b);return((parseInt(a)-b+7)%7)+1};Date.FormatDateTime=function(c,b){if(c.toUpperCase().substring(0,3)=="NOW"){c=new Date()}if(!Date.CDate(c)){return"invalid date: '"+c+"'"}if(isNaN(b)){b=vbGeneralDate}var a=Date.CDate(c);switch(parseInt(b)){case vbGeneralDate:return a.toString();case vbLongDate:return Format(c,"DDDD, MMMM D, YYYY");case vbShortDate:return Format(c,"MM/DD/YYYY");case vbLongTime:return a.toLocaleTimeString();case vbShortTime:return Format(c,"HH:MM:SS");default:return"invalid NamedFormat: '"+b+"'"}};Date.Format=function(h,g,f,e){if(!Date.CDate(h)){return"invalid date: '"+h+"'"}if(!g||g==""){return b.toString()}var b=Date.CDate(h);this.pad=function(l){if(l.toString().length==1){l="0"+l}return l};var i=b.getUTCHours()>=12?"PM":"AM";var j=b.getUTCHours();if(j==0){j=12}if(j>12){j-=12}var d=j+":"+this.pad(b.getUTCMinutes())+":"+this.pad(b.getUTCSeconds())+" "+i;var c=(b.getUTCMonth()+1)+"/"+b.getUTCDate()+"/"+new String(b.getUTCFullYear()).substring(2,4);var k=Date.MonthName(b.getUTCMonth()+1)+" "+b.getUTCDate()+", "+b.getUTCFullYear();var a=g;a=a.replace(new RegExp("C","gi"),"CCCC");a=a.replace(new RegExp("mmmm","gi"),"XXXX");a=a.replace(new RegExp("mmm","gi"),"XXX");a=a.replace(new RegExp("dddddd","gi"),"AAAAAA");a=a.replace(new RegExp("ddddd","gi"),"AAAAA");a=a.replace(new RegExp("dddd","gi"),"AAAA");a=a.replace(new RegExp("ddd","gi"),"AAA");a=a.replace(new RegExp("timezone","gi"),"ZZZZ");a=a.replace(new RegExp("time24","gi"),"TTTT");a=a.replace(new RegExp("time","gi"),"TTT");a=a.replace(new RegExp("yyyy","gi"),b.getUTCFullYear());a=a.replace(new RegExp("yy","gi"),new String(b.getUTCFullYear()).substring(2,4));a=a.replace(new RegExp("y","gi"),Date.DatePart("y",b));a=a.replace(new RegExp("q","gi"),Date.DatePart("q",b));a=a.replace(new RegExp("mm","gi"),(b.getUTCMonth()+1));a=a.replace(new RegExp("m","gi"),(b.getUTCMonth()+1));a=a.replace(new RegExp("dd","gi"),this.pad(b.getUTCDate()));a=a.replace(new RegExp("d","gi"),b.getUTCDate());a=a.replace(new RegExp("hh","gi"),this.pad(b.getUTCHours()));a=a.replace(new RegExp("h","gi"),b.getUTCHours());a=a.replace(new RegExp("nn","gi"),this.pad(b.getUTCMinutes()));a=a.replace(new RegExp("n","gi"),b.getUTCMinutes());a=a.replace(new RegExp("ss","gi"),this.pad(b.getUTCSeconds()));a=a.replace(new RegExp("s","gi"),b.getUTCSeconds());a=a.replace(new RegExp("t t t t t","gi"),d);a=a.replace(new RegExp("am/pm","g"),b.getUTCHours()>=12?"pm":"am");a=a.replace(new RegExp("AM/PM","g"),b.getUTCHours()>=12?"PM":"AM");a=a.replace(new RegExp("a/p","g"),b.getUTCHours()>=12?"p":"a");a=a.replace(new RegExp("A/P","g"),b.getUTCHours()>=12?"P":"A");a=a.replace(new RegExp("AMPM","g"),b.getUTCHours()>=12?"pm":"am");a=a.replace(new RegExp("XXXX","gi"),Date.MonthName(b.getUTCMonth()+1,false));a=a.replace(new RegExp("XXX","gi"),Date.MonthName(b.getUTCMonth()+1,true));a=a.replace(new RegExp("AAAAAA","gi"),k);a=a.replace(new RegExp("AAAAA","gi"),c);a=a.replace(new RegExp("AAAA","gi"),Date.WeekdayName(b.getUTCDay()+1,false,f));a=a.replace(new RegExp("AAA","gi"),Date.WeekdayName(b.getUTCDay()+1,true,f));a=a.replace(new RegExp("TTTT","gi"),b.getUTCHours()+":"+this.pad(b.getUTCMinutes()));a=a.replace(new RegExp("TTT","gi"),j+":"+this.pad(b.getUTCMinutes())+" "+i);a=a.replace(new RegExp("CCCC","gi"),c+" "+d);tz=b.getTimezoneOffset();timezone=(tz<0)?("GMT-"+tz/60):(tz==0)?("GMT"):("GMT+"+tz/60);a=a.replace(new RegExp("ZZZZ","gi"),timezone);return a};IsDate=Date.IsDate;CDate=Date.CDate;DateAdd=Date.DateAdd;DateDiff=Date.DateDiff;DatePart=Date.DatePart;MonthName=Date.MonthName;WeekdayName=Date.WeekdayName;Weekday=Date.Weekday;FormatDateTime=Date.FormatDateTime;Format=Date.Format;

/**
 * Flot plugin for special time formatting that includes weekday names.
 *
 * @author Joel Oughton
 */
(function($){
    function init(plot){

        var _checkTimeMode = function(plot, options) {
            var axes = plot.getXAxes();
            
            $.each(axes, function(index, xaxis) {
            
                // check if this plugin is enabled
                if (xaxis.options.timeformat && xaxis.options.timeformat == "weekdays") {
                
                    // set the tick formatter to be our custom one
                    xaxis.options.tickFormatter = function (val, axis){
                        var range = axis.max - axis.min;
                        
                        if (range < 2 * 24 * 60 * 60 * 1000) 
                            return Date.Format(val, "h:nn");
                        if (range < 5 * 24 * 60 * 60 * 1000) 
                            return Date.Format(val, "ddd hh:nn");
                        if (range < 10 * 24 * 60 * 60 * 1000) 
                            return Date.Format(val, "ddd mmm d");
                        if (range < 31 * 24 * 60 * 60 * 1000) 
                            return Date.Format(val, "mmm d");
                        
                        return Date.Format(val, "mmm d, yyyy");
                    }
                }
            });
        }

        plot.hooks.processOptions.push(_checkTimeMode);
    }
    
    $.plot.plugins.push({
        init: init,
        name: "weekdaynames",
        version: "0.1"
    });
})(jQuery);
