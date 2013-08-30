/* */

var util = require('util');
var FiidmiObject = require('./FiidmiObject.js');

var restaurant_schema = {
	"title": "Restaurant data",
	"type": "object",
	"properties": {
		"id": { "$ref": "#/definitions/integer" },
		"name": { "type": "string" },
		"regular_cash_enabled": { "type": "boolean" },
		"address": { "$ref": "#/definitions/address" },
		"payment_methods": {
			"type": "object",
			"patternProperties": {
				"^(1|2|4|8|16|32|64|128|256|512|1024|2048|4096|8192|16384|32768|65536|131072|262144|524288|1048576|2097152|4194304|8388608|16777216|33554432|67108864|134217728|268435456|536870912|1073741824|2147483648)$": {
					"type": "object",
					"properties": {
						"slug": { "type": "string" },
						"name": { "type": "string" }
					}
				}
			}
		},
		"average_delivery_time": { "$ref": "#/definitions/integer" },
		"average_fetch_time": { "$ref": "#/definitions/integer" },
		"small_order_additional_fee": { "$ref": "#/definitions/double" },
		"small_order_fee_limit": { "$ref": "#/definitions/double" },
		"has_delivery": { "$ref": "#/definitions/integer" },
		"delivery_range": { "$ref": "#/definitions/double" },
		"delivery_possible_over": { "$ref": "#/definitions/double" },
		"delivery_free_over": { "$ref": "#/definitions/double" },
		"delivery_fee": { "$ref": "#/definitions/double" },
		"changeable_ingredients_amount": { "$ref": "#/definitions/integer" },
		"available": { "$ref": "#/definitions/integer" },
		"lunch_price_in_online_orders": { "type": "boolean" },
		"categories": {
			"type": "array",
			"items": { "$ref": "#/definitions/category" }
		}
		"delivery_methods": ,
		"ingredient_groups": ,
		"description": ,
	},
	"definitions": {
		"integer": {
			"type": "string",
			"pattern": "^[0-9]+$"
		},
		"double": {
			"type": "string",
			"pattern": "^[0-9]+\.[0-9]+$"
		},
		"address": {
			"type": "object",
			"properties": {
				"address": { "type": "string" },
				"phone_number": { "type": "string" },
				"postal_code": { "type": "string" },
				"city": { "type": "string" },
				"latitude": { "type": "string" },
				"longitude": { "type": "string" }
			}
		},
		"category": {
			"id": { "$ref": "#/definitions/integer" },
			"name": { "type": "string" },
		}
	}
};

function Restaurant(opts) {
	FiidmiObject.call(this);
}

util.inherits(Restaurant, FiidmiObject);

// Expose the JSON schema
Restaurant.schema = restaurant_schema;

// Exports
module.exports = Restaurant;

/* EOF */
