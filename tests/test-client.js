"use strict";

var client = require('../lib/client.js');
var assert = require('assert');

/* */
describe('client', function(){

	describe('.stringify()', function(){
		it.skip('should return correct values for plain variables', function(){
			assert.strictEqual(client.stringify(true)            , '' );
		});
		it('should return correct values for plain objects', function(){
			assert.strictEqual(client.stringify({foo:'bar'})            , 'foo=bar' );
			assert.strictEqual(client.stringify({foo:'bar', bar:'foo'}) , 'foo=bar&bar=foo' );
		});
		it('should return correct values for child objects', function(){
			assert.strictEqual(client.stringify({hello:{foo:'bar'}})            , 'hello[foo]=bar' );
			assert.strictEqual(client.stringify({foo:{a:1,b:2,c:3}})            , 'foo[a]=1&foo[b]=2&foo[c]=3' );
			assert.strictEqual(client.stringify({hello:{foo:{a:1, b:2}}})       , 'hello[foo][a]=1&hello[foo][b]=2' );
			assert.strictEqual(client.stringify({hello:{foo:{a:1, b:2}, bar:3}})       , 'hello[foo][a]=1&hello[foo][b]=2&hello[bar]=3' );
		});
	});

});

/* EOF */
