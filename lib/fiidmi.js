/* Fiidmi API Library */

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
}

/** List restaurants */
Fiidmi.prototype.restaurantList = function(opts) {
	var self = this;
	opts = opts || {};
	return client.post(self._url+'/restaurant/list', opts);
};

// Export
module.exports = Fiidmi;

/* EOF */
