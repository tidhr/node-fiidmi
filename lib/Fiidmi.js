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

	if(options.api_key) {
		self._api_key = require('crypto').createHash('sha512').update(options.api_key).digest('hex');
	}

	if(options.secret) {
		self._secret = require('crypto').createHash('sha512').update(options.secret).digest('hex');
	}

	self._auto_session_id = is.true( options.autoSessionId );
	self._session_id = undefined;

	extend.ActionObject.call(this);
}

util.inherits(Fiidmi, extend.ActionObject);

/** Enables automatic setting of internal `session_id` when `.accountLogin()` is called */
Fiidmi.prototype.enableAutoSessionId = function(value) {
	var self = this;
	self._auto_session_id = is.true(value);
	return self;
};

/** Sets session id for this interface. Please be careful not to share the same instance of the API between other customers! */
Fiidmi.prototype.setSessionId = function(id) {
	var self = this;
	if(is.undef(id)) { throw new TypeError("bad argument"); }
	this._session_id = id;
	return self;
};

/** Clears session id */
Fiidmi.prototype.clearSessionId = function() {
	var self = this;
	this._session_id = undefined;
	return self;
};

/** Sets session id for this interface. Please be careful not to share the same instance of the API between other customers! */
Fiidmi.prototype.setApiKey = function(key, secret) {
	var self = this;
	if(is.undef(key) || is.undef(secret)) { throw new TypeError("bad argument"); }
	self._api_key = require('crypto').createHash('sha512').update(key).digest('hex');
	self._secret = require('crypto').createHash('sha512').update(secret).digest('hex');
	return self;
};

Fiidmi.prototype.setSessionID = Fiidmi.prototype.setSessionId;
Fiidmi.prototype.clearSessionID = Fiidmi.prototype.clearSessionId;
Fiidmi.prototype.enableAutoSessionID = Fiidmi.prototype.enableAutoSessionId;

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
				if( (action.type === 'object') && action.properties) {
					if( is.undef(opts.api_key) && is.def(action.properties.api_key) && is.def(self._api_key) ) {
						opts.api_key = self._api_key;
					}
					if( is.undef(opts.secret) && is.def(action.properties.secret) && is.def(self._secret) ) {
						opts.secret = self._secret;
					}
					if( is.undef(opts.session_id) && is.def(action.properties.session_id) && is.def(self._session_id) ) {
						opts.session_id = self._session_id;
					}
				}
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

					if( is.true(self._auto_session_id) && (href === '/account/login') ) {
						p2 = p2.then(function(data) {

							// The documentation says [here](http://fiidmi.fi/documentation/account#account_login) that the result would be array, but it seems to be an object.
							if(is.array(data)) {
								data.forEach(function(o) {
									if(is.obj(o) && is.def(o.session_id)) {
										self.setSessionId(o.session_id);
									}
								});
							}

							// ...so let's handle single objects, too
							if(is.obj(data)) {
								(function(o) {
									if(is.obj(o) && is.def(o.session_id)) {
										self.setSessionId(o.session_id);
									}
								}(data));
							}

							return data;
						});
					}

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
