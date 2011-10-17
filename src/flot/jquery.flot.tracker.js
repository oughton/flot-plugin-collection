/**
* Flot plugin for adding a vertical line to the plot when it is clicked.
* 
* @author Joel Oughton
*/

(function ($) {
	var options = {
		crosshair: {
			mode: null, // one of null, "x", "y" or "xy",
			hide: false,
			color: "rgba(170, 0, 0, 0.80)",
			lineWidth: 1
		}
	};
	
	function init(plot) {
		var crosshairs = [];

		// position of crosshair in pixels
		var crosshair = { x: -1, y: -1, locked: false };

		plot.setCrosshair = function setCrosshair(pos) {
			if (!pos)
				crosshair.x = -1;
			else {
				var axes = plot.getAxes();
				crosshair.x = Math.max(0, Math.min(pos.x != null ? axes.xaxis.p2c(pos.x) : axes.x2axis.p2c(pos.x2), plot.width()));
				crosshair.y = Math.max(0, Math.min(pos.y != null ? axes.yaxis.p2c(pos.y) : axes.y2axis.p2c(pos.y2), plot.height()));
			}
			
			plot.triggerRedrawOverlay();
		};
			
		plot.clearCrosshair = plot.setCrosshair; // passes null for pos
		plot.clearCrosshairs = function clearCrosshairs() {
			crosshairs = [];
		}
			
		plot.lockCrosshair = function lockCrosshair(pos) {
			if (pos)
				plot.setCrosshair(pos);
			crosshair.locked = true;
		}

		plot.unlockCrosshair = function unlockCrosshair() {
			crosshair.locked = false;
		}
		
		plot.getCrosshairs = function getCrosshairs() {
			return crosshairs;
		}
		
		plot.setCrosshairs = function setCrosshairs(c) {
			crosshairs = c;
		}

		plot.hooks.bindEvents.push(function (plot, eventHolder) {
			if (!plot.getOptions().crosshair.mode)
				return;

			eventHolder.mouseout(function () {
				if (crosshair.x != -1) {
					crosshair.x = -1;
					plot.triggerRedrawOverlay();
				}
			});
			
			eventHolder.mousemove(function (e) {
				if (plot.getSelection && plot.getSelection()) {
					crosshair.x = -1; // hide the crosshair while selecting
						return;
				}
				
				if (crosshair.locked)
					return;
					
				var offset = plot.offset();
				crosshair.x = Math.max(0, Math.min(e.pageX - offset.left, plot.width()));
				crosshair.y = Math.max(0, Math.min(e.pageY - offset.top, plot.height()));
				plot.triggerRedrawOverlay();
			});
			
			if (!plot.getOptions().crosshair.hide) {
				eventHolder.mousedown(function (e) {
					var axes = plot.getAxes();
			
					crosshair.locked = true;
					
					// add crosshair to the array of crosshairs
					crosshair.xp = axes.xaxis.c2p(crosshair.x);
					crosshair.yp = axes.yaxis.c2p(crosshair.y);
					crosshairs.push(crosshair);
	
					crosshair = { x: -1, y: -1, locked: false };
					plot.triggerRedrawOverlay();
				});
			}
		});
		
		var drawCrosshairs = function (plot, ctx) {
			var c = plot.getOptions().crosshair;
			
			if (!c.mode) {
				return;
			}
			
			if (!c.hide) {
				crosshairs.push(crosshair);
			}

			var plotOffset = plot.getPlotOffset();
			
			for (var i = 0; i < crosshairs.length; i++) {
				var thisCrosshair = crosshairs[i];
				
				if (thisCrosshair.xp && thisCrosshair.yp) {
					var axes = plot.getAxes();
					thisCrosshair.x = axes.xaxis.p2c(thisCrosshair.xp);
					thisCrosshair.y = axes.yaxis.p2c(thisCrosshair.yp);
				}
			
				ctx.save();
				ctx.translate(plotOffset.left, plotOffset.top);
	
				if (thisCrosshair.x != -1) {
					ctx.strokeStyle = c.color;
					ctx.lineWidth = c.lineWidth;
					ctx.lineJoin = "round";
	
					ctx.beginPath();
					if (c.mode.indexOf("x") != -1) {
						ctx.moveTo(thisCrosshair.x, 0);
						ctx.lineTo(thisCrosshair.x, plot.height());
					}
					if (c.mode.indexOf("y") != -1) {
						ctx.moveTo(0, thisCrosshair.y);
						ctx.lineTo(plot.width(), thisCrosshair.y);
					}
					ctx.stroke();
				}
				ctx.restore();
			}
			
			if (!c.hide) {
				crosshairs.pop();
			}
		}
		
		plot.hooks.drawOverlay.push(drawCrosshairs);
	}
	
	$.plot.plugins.push({
		init: init,
		options: options,
		name: 'tracker',
		version: '0.1'
	});
})(jQuery);
