#!/bin/env node
"use strict";
var Fiidmi = require('../lib/Fiidmi.js');

var methods = [
	"/account/login",
	"/account/logout",
	"/account/check_login",
	"/account/register",
	"/account/modify",
	"/customer/address/get",
	"/customer/address/set",
	"/customer/address/modify",
	"/customer/restaurants/list",
	"/customer/restaurants/set",
	"/customer/restaurants/delete",
	"/customer/distance",
	"/customer/order_history/list",
	"/customer/order_history/get",
	"/customer/information/bonus",
	"/customer/information/po_credit",
	"/restaurant/list",
	"/restaurant/get",
	"/restaurant/timetable",
	"/restaurant/rate",
	"/restaurant/rating",
	"/restaurant/chains",
	"/restaurant/make_order",
	"/restaurant/order_status",
	"/service/policy"
];

console.log('// This file has been built automatically with ./build-Fiidmi-methodtest.js');
console.log('"use strict";');
console.log('var Fiidmi = require("../lib/Fiidmi.js");');
console.log('var assert = require("assert");');

console.log('describe("Fiidmi methods", function(){');
console.log('	describe("api", function(){');
console.log('		var api = new Fiidmi();');

methods.forEach(function(href) {
	var method = Fiidmi.getMethodName(href);
	console.log('		it(".'+method+'() is callable (for '+href+')", function(){ assert.strictEqual(typeof api.'+method+', "function"); });');
});

console.log('	});');
console.log('});');

/* EOF */
