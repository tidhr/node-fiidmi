/* Fiidmi API Library */

/** `Fiidmi` constructor. */
function Fiidmi() {
	options = options || {};

	// If true, test environment is enabled, otherwise not.
	options.test = options.test || false;

	// The hostname to Fiidmi API
	options.url = options.url || (options.test ? 'testapi.fiidmi.fi' : 'api.fiidmi.fi');

	this.options = options;
}



// Export
module.exports = Fiidmi;

/* EOF */
