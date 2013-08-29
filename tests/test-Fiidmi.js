"use strict";

var Fiidmi = require('../lib/Fiidmi.js');
var assert = require('assert');

/* */
describe('Fiidmi', function(){

	describe('.getMethodName()', function(){

		it('should return correct values for single names', function(){
			assert.strictEqual(Fiidmi.getMethodName('/foo'), 'foo' );
			assert.strictEqual(Fiidmi.getMethodName('/foo_bar'), 'fooBar' );
		});

		it('should return correct values for two part names', function(){
			assert.strictEqual(Fiidmi.getMethodName('/foo/bar'), 'fooBar' );
			assert.strictEqual(Fiidmi.getMethodName('/account/login'), 'accountLogin' );
		});

		it('should return correct values for two part names which underscores', function(){
			assert.strictEqual(Fiidmi.getMethodName('/restaurant/make_order'), 'restaurantMakeOrder' );
		});

		it('should return correct values for three part names', function(){
			assert.strictEqual(Fiidmi.getMethodName('/foo/bar/hello'), 'fooBarHello' );
		});

	});

});

/* EOF */
