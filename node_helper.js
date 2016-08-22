'use strict';

/* Magic Mirror
 * Module: Clap
 *
 * By Cato Antonsen
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var Gpio = require('onoff').Gpio;

module.exports = NodeHelper.create({
	log: function(message) {
		var now = Date.now();
		console.log("[" + this.name + "] " + now + " (" + (now - this.lastLog) + ") " + message);
		this.lastLog = now;
	},

	error: function(message) {
		console.log("[" + this.name + "] " + message);
	},
	
    start: function () {
        this.started = false;
        this.config = null;
		this.lm393 = null;
		this.lastLog = null;
    },

	socketNotificationReceived: function (notification, payload) {
		var self = this;
        self.log("---->Notification received: " + notification);
        if (notification === 'CONFIG') {
            self.config = payload;
            self.started = true;
			self.lastSound = null;
			self.lastValue = null;
			self.timer = null;
			self.claps = 0; 

			self.lm393 = new Gpio(self.config.GpioPin, 'in', 'both', { activeLow: true }),
			self.startPolling();
		}
    },
	
	startPolling: function() {
		var self = this;

		self.lm393.watch(function(err, value) {
			var now = Date.now();

			self.log("----------------- START -----------------");

			if (err) {
				self.error("Unknown error: " + err);
				return;
			}

			self.log("VALUE: " + value + " LAST VALUE: " + self.lastValue + " CLAPS: " + self.claps);
			
			if (value == self.lastValue) {
				self.log("Same");
				return;
			}
			
			if (value == 1) {
				if (self.lastSound == null || now - self.lastSound > self.config.MinTimeBetweenClaps) {
					self.claps++;
				} else {
					self.claps = 1;
				}
				self.lastSound = now;
			} else if (value == 0) {

				if (self.claps > 0) {
					self.log("Waiting... ");
					if (self.timer == null) {
						self.timer = setTimeout(function() {
							if (self.claps > 0 && Date.now() - self.lastSound > self.config.WaitAfterLastClap) {
								self.log("SENDING CLAPS: " + self.claps);
								self.claps = 0;
							}
							
							clearTimeout(self.timer);
							self.timer = null;
							
							self.log("---------------------------------- WAIT ENDED ----------------------------------");
						}, self.config.WaitAfterLastClap);;
					} else {
						self.log("Already waiting...");
					}
				} else {
					self.log("No point in waiting - claps = 0");
				}
			}

			self.log("Claps: " + self.claps);
			
			self.lastValue = value;
			
			self.log("----------------- END -----------------");
		} );
	},
});