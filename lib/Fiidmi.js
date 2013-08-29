/* Fiidmi API Library */

var Q = require('q');
var is = require('nor-is');
var util = require('util');
var extend = require('nor-extend');
var client = require('./client.js');

// JSON schema validator
var json_schema = require('./json_schema.js');

var API_VERSION = '3.3';

/** `Fiidmi` constructor. */
function Fiidmi(options) {
	var self = this;

	options = options || {};

	if(options.hostname === 'testapi.fiidmi.fi') {
		options.test = true;
	}

	// If true, test environment is enabled, otherwise not.
	self._test = is.def(options.test) ? is.true(options.test) : false;

	// The hostname to Fiidmi API
	self._hostname = options.hostname || (self._test ? 'testapi.fiidmi.fi' : 'api.fiidmi.fi');
	self._version = options.api_version || API_VERSION;
	self._url = 'https://'+self._hostname+'/'+self._version;
	self._api_key = options.api_key;
	self._secret = options.secret;

	extend.ActionObject.call(this);
}

util.inherits(Fiidmi, extend.ActionObject);

/** Returns the method name of href */
Fiidmi.getMethodName = function(href) {
	var parts = href.split(/[\/_]/)
	var first;
	do {
		first = parts.shift();
	} while(first === '');
	first = first || '';
	return first + parts.map(function(p) { return p.charAt(0).toUpperCase() + p.slice(1); }).join('');
};

/** All Fiidmi API actions */
Fiidmi._actions = require('./api/'+API_VERSION);

var ERROR_SCHEMA = {
	'type': 'array',
	'minItems': 1,
	'items': {
		'type': 'object',
		'properties': {
			'label': {'type':'string'},
			'message': {'type':'string'}
		},
		'required': ['label', 'message']
	}
};

/* Build methods */
function build_methods(obj, path) {
	path = path || '';
	Object.keys(obj).forEach(function(key) {
		var action = obj[key];
		var href = path+ '/' + key;
		if(action.type) {
			//console.error('DEBUG: href = ' + href + ' and name = ' + Fiidmi.getMethodName(href));
			extend.ActionObject.setup(Fiidmi, Fiidmi.getMethodName(href), function(opts) {
				var self = this;
				opts = opts || {};

				/*
				var results = require('jsonschema').validate(opts, action);
				if(results.errors.length >= 1) {
					throw new TypeError("bad arguments: " + results.errors.join(', ') );
				}
				*/

				var p = json_schema.validate(opts, action).fail(function(err) {
						throw new TypeError("Bad arguments for " + Fiidmi.getMethodName(href) + ": " + util.inspect(err) );
				}).then(function() {
					var p2 = client.post(self._url+ href, opts).then(function(data) {
						// Check for API errors
						var defer = Q.defer();
						json_schema.validate(data, ERROR_SCHEMA).then(function() {
							defer.reject(data);
						}).fail(function(errs) {
							defer.resolve(data);
						}).done();
						return defer.promise;
					});
					return p2;
				});

				return p;
			});
		} else {
			build_methods(obj[key], href);
		}
	});
}

build_methods(Fiidmi._actions);

// Export
module.exports = Fiidmi;

/* EOF */
