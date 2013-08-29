module.exports = {
	"address": require("./address.js"),

	// http://fiidmi.fi/documentation/customer_restaurants#customer_restaurants_set
	"distance": {
		"type": "object",
		"properties": {
			"restaurant_id":      { "type": "string", "minLength": 1, "maxLength": 50 },
			"session_id":         { "type": "string", "minLength": 2, "maxLength": 50 },
			"address":            {
				"type": "array",
				"minItems": 1,
				"items": {
					"type": "object",
					"properties": {
						"address":         { "type": "string", "minLength": 1, "maxLength": 150 },
						"postal_code":     { "type": "string", "minLength": 1, "maxLength": 5 },
						"city":            { "type": "string", "minLength": 1, "maxLength": 100 },
						"latitude":        { "type": "string", "pattern": "^[0-9]{2}\.[0-9]{6}$" },
						"longitude":       { "type": "string", "pattern": "^[0-9]{2}\.[0-9]{6}$" }
					}
				}
			}
		},
		"required": ["session_id", "restaurant_id", "address"]
	},

	"order_history": require('./order_history.js');
};
