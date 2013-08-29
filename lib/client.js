/* HTTP Request */

var is = require('nor-is');
var https = require('https');
var Q = require('q');
var client = module.exports = {};

client.stringify = function(data) {
	if(!is.obj(data)) {
		throw new TypeError("bad argument");
		//return require('querystring').stringify(data);
	}

	var escape = require('querystring').escape;

	var ret = [];

	/* FIXME: Sub objects like {foo:{a:1,b:2,c:3}} should be translated to {'foo[a]':1, 'foo[b]':2, 'foo[c]':3} */
	function do_sub(data, prefix) {
		prefix = (prefix && prefix+'[') || '';
		suffix = (prefix && ']') || '';
		Object.keys(data).forEach(function(key) {
			if(!is.obj(data[key])) {
				ret.push( prefix + escape(key) + suffix + '=' + escape(data[key]) );
			} else {
				do_sub(data[key], prefix + escape(key) + suffix);
			}
		});
	}

	do_sub(data);
	return ret.join('&');
};

/** POST request */
client.post = function(url, data) {
	var defer = Q.defer();
	try {

		var parsed_url = require('url').parse(url);

		if(data.api_key) {
			data.api_key = require('crypto').createHash('sha512').update(data.api_key).digest('hex');
		}
		if(data.secret) {
			data.secret = require('crypto').createHash('sha512').update(data.secret).digest('hex');
		}

		var post_data = client.stringify(data);
		var content_length = Buffer.byteLength(post_data, 'utf8');

		var options = {
			hostname: parsed_url.hostname,
			port: 443,
			path: parsed_url.path,
			method: 'POST',
			//rejectUnauthorized: false, // FIXME: Remove when fiidmi.fi SSL is fixed
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': content_length
			}
		};

		//console.error( require('util').inspect( options ) );

		var req = https.request(options, function(res) {
			res.setEncoding('utf8');

			var content = "";
			res.on('data', function(d) {
				content += d;
			});
			res.on('end', function() {
				try {
					var content_type = (res && res.headers && res.headers['content-type']) || 'text/plain';
					var parsed_content = (content_type === 'application/json') ? JSON.parse(content) : content;
					var r = {
						status: res.statusCode,
						headers: res.headers,
						type: content_type,
						content: parsed_content
					};
					defer.resolve(r);
				} catch(e) {
					defer.reject(e);
				}
			});
		});
		req.write( post_data );
		req.end();

		req.on('error', function(e) {
			defer.reject(e);
		});

	} catch(e) {
		defer.reject(e);
	}
	return defer.promise;
};

/* EOF */
