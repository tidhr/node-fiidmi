// This file has been built automatically with ./build-Fiidmi-methodtest.js
"use strict";
var Fiidmi = require("../lib/Fiidmi.js");
var assert = require("assert");
describe("Fiidmi methods", function(){
	describe("api", function(){
		var api = new Fiidmi();
		it(".accountLogin() is callable (for /account/login)", function(){ assert.strictEqual(typeof api.accountLogin, "function"); });
		it(".accountLogout() is callable (for /account/logout)", function(){ assert.strictEqual(typeof api.accountLogout, "function"); });
		it(".accountCheckLogin() is callable (for /account/check_login)", function(){ assert.strictEqual(typeof api.accountCheckLogin, "function"); });
		it(".accountRegister() is callable (for /account/register)", function(){ assert.strictEqual(typeof api.accountRegister, "function"); });
		it(".accountModify() is callable (for /account/modify)", function(){ assert.strictEqual(typeof api.accountModify, "function"); });
		it(".customerAddressGet() is callable (for /customer/address/get)", function(){ assert.strictEqual(typeof api.customerAddressGet, "function"); });
		it(".customerAddressSet() is callable (for /customer/address/set)", function(){ assert.strictEqual(typeof api.customerAddressSet, "function"); });
		it(".customerAddressModify() is callable (for /customer/address/modify)", function(){ assert.strictEqual(typeof api.customerAddressModify, "function"); });
		it(".customerRestaurantsList() is callable (for /customer/restaurants/list)", function(){ assert.strictEqual(typeof api.customerRestaurantsList, "function"); });
		it(".customerRestaurantsSet() is callable (for /customer/restaurants/set)", function(){ assert.strictEqual(typeof api.customerRestaurantsSet, "function"); });
		it(".customerRestaurantsDelete() is callable (for /customer/restaurants/delete)", function(){ assert.strictEqual(typeof api.customerRestaurantsDelete, "function"); });
		it(".customerDistance() is callable (for /customer/distance)", function(){ assert.strictEqual(typeof api.customerDistance, "function"); });
		it(".customerOrderHistoryList() is callable (for /customer/order_history/list)", function(){ assert.strictEqual(typeof api.customerOrderHistoryList, "function"); });
		it(".customerOrderHistoryGet() is callable (for /customer/order_history/get)", function(){ assert.strictEqual(typeof api.customerOrderHistoryGet, "function"); });
		it(".customerInformationBonus() is callable (for /customer/information/bonus)", function(){ assert.strictEqual(typeof api.customerInformationBonus, "function"); });
		it(".customerInformationPoCredit() is callable (for /customer/information/po_credit)", function(){ assert.strictEqual(typeof api.customerInformationPoCredit, "function"); });
		it(".restaurantList() is callable (for /restaurant/list)", function(){ assert.strictEqual(typeof api.restaurantList, "function"); });
		it(".restaurantGet() is callable (for /restaurant/get)", function(){ assert.strictEqual(typeof api.restaurantGet, "function"); });
		it(".restaurantTimetable() is callable (for /restaurant/timetable)", function(){ assert.strictEqual(typeof api.restaurantTimetable, "function"); });
		it(".restaurantRate() is callable (for /restaurant/rate)", function(){ assert.strictEqual(typeof api.restaurantRate, "function"); });
		it(".restaurantRating() is callable (for /restaurant/rating)", function(){ assert.strictEqual(typeof api.restaurantRating, "function"); });
		it(".restaurantChains() is callable (for /restaurant/chains)", function(){ assert.strictEqual(typeof api.restaurantChains, "function"); });
		it(".restaurantMakeOrder() is callable (for /restaurant/make_order)", function(){ assert.strictEqual(typeof api.restaurantMakeOrder, "function"); });
		it(".restaurantOrderStatus() is callable (for /restaurant/order_status)", function(){ assert.strictEqual(typeof api.restaurantOrderStatus, "function"); });
		it(".servicePolicy() is callable (for /service/policy)", function(){ assert.strictEqual(typeof api.servicePolicy, "function"); });
	});
});
