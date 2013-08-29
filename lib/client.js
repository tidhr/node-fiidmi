/* HTTP Request */

var https = require('https');
var Q = require('q');
var client = module.exports = {};

/** POST request */
client.post = function(url, data) {
	var defer = Q.defer();
	try {

		var parsed_url = require('url').parse(url);

		//var post_data = JSON.stringify(data);
		//var content_length = Buffer.byteLength(post_data, 'utf8');
		
		if(data.api_key) {
			data.api_key = require('crypto').createHash('sha512').update(data.api_key).digest('hex');
		}
		if(data.secret) {
			data.secret = require('crypto').createHash('sha512').update(data.secret).digest('hex');
		}

		var post_data = require('querystring').stringify(data);
		var content_length = post_data.length;

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