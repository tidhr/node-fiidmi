module.exports = {

	// http://fiidmi.fi/documentation/customer#customer_address_set
	"list": {
		"type": "object",
		"properties": {
			"session_id":      { "type": "string", "minLength": 2, "maxLength": 50 },
			"chain_id":        { "type": "string", "minLength": 1, "maxLength": 50 },
			"sort_by":         { "type": "string", "minLength": 1, "maxLength": 50 }
		},
		"required": ["session_id"]
	},

	// http://fiidmi.fi/documentation/customer_restaurants#customer_restaurants_set
	"set": {
		"type": "object",
		"properties": {
			"session_id":         { "type": "string", "minLength": 2, "maxLength": 50 },
			"restaurant_id":      { "type": "string", "minLength": 1, "maxLength": 50 }
		},
		"required": ["session_id", "restaurant_id"]
	},

	// http://fiidmi.fi/documentation/customer_restaurants#customer_restaurants_delete
	"delete": {
		"type": "object",
		"properties": {
			"session_id":         { "type": "string", "minLength": 2, "maxLength": 50 },
			"restaurant_id":      { "type": "string", "minLength": 1, "maxLength": 50 }
		},
		"required": ["session_id", "restaurant_id"]
	}
};
