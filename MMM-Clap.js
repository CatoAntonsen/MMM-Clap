/* global Module */

/* Magic Mirror
 * Module: Clap
 *
 * By Cato Antonsen
 * MIT Licensed.
 */
 

Module.register("MMM-Clap",{

	defaults: {
		GpioPin: 24,
		MinTimeBetweenClaps: 50,
		MaxTimeBetweenClaps: 1000,
		WaitAfterLastClap: 1500
	},

	start: function() {
		Log.info('---->Starting module: ' + this.name);
		this.sendSocketNotification('CONFIG', this.config);
	},
});
