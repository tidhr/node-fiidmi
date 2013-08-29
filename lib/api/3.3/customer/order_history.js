/* http://fiidmi.fi/documentation/customer_order_history */
module.exports = {

	"list": {
		"type": "object",
		"properties": {
			"session_id":      { "type": "string", "minLength": 2, "maxLength": 50 },
			"restaurant_id":      { "type": "string", "minLength": 1, "maxLength": 50 }
		},
		"required": ["session_id"]
	},

	"get": {
		"type": "object",
		"properties": {
			"session_id":       { "type": "string", "minLength": 2, "maxLength": 50 },
			"order_id":         { "type": "string", "minLength": 1, "maxLength": 50 }
		},
		"required": ["session_id", "order_id"]
	}

};
