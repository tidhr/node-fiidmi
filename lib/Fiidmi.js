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
Fiidmi.actions = require('./api/3.3');

/* Build methods */
function build_methods(obj, path) {
	path = path || '';
	Object.keys(obj).forEach(function(key) {
		var action = obj[key];
		if(action.type) {
			extend.ActionObject.setup(Fiidmi, (path + '/' + key).split('/').join('_'), function(opts) {
				var self = this;
				opts = opts || {};
				var results = require('jsonschema').validate(opts, action);
				if(results.errors.length >= 1) {
					throw new TypeError("bad arguments: " + results.errors.join(', ') );
				}
				return client.post(self._url+ path + '/' + key, opts);
			});
		} else {
			build_methods(obj, path+ '/' + key);
		}
	});
}

build_methods(Fiidmi.actions);

// Export
module.exports = Fiidmi;

/* EOF */
