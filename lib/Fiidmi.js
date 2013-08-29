/* Fiidmi API Library */

var util = require('util');
var extend = require('nor-extend');
var client = require('./client.js');

/** `Fiidmi` constructor. */
function Fiidmi(options) {
	var self = this;

	options = options || {};

	// If true, test environment is enabled, otherwise not.
	self._test = options.test || false;

	// The hostname to Fiidmi API
	self._hostname = options.hostname || (self._test ? 'testapi.fiidmi.fi' : 'api.fiidmi.fi');
	self._version = options.api_version || '3.3';
	self._url = 'https://'+self._hostname+'/'+self._version;
	self._api_key = options.api_key;
	self._secret = options.secret;

	extend.ActionObject.call(this);
}

util.inherits(Fiidmi, extend.ActionObject);

/** All Fiidmi API actions */
Fiidmi.actions = require('./api/fiidmi-3.3.js');

/* Build methods */
Object.keys(Fiidmi.actions).forEach(function(key) {
	var action = Fiidmi.actions[key];
	extend.ActionObject.setup(Fiidmi, key, function(opts) {
		var self = this;
		opts = opts || {};
		return client.post(self._url+action.name, opts);
	});
});

// Export
module.exports = Fiidmi;

/* EOF */
