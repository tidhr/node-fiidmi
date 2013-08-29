/* http://fiidmi.fi/documentation/customer_order_history */
module.exports = {

	"bonus": {
		"type": "object",
		"properties": {
			"session_id":      { "type": "string", "minLength": 2, "maxLength": 50 },
			"restaurant_id":      { "type": "string", "minLength": 1, "maxLength": 50 }
		},
		"required": ["session_id", "restaurant_id"]
	},

	"po_credit": {
		"type": "object",
		"properties": {
			"session_id":       { "type": "string", "minLength": 2, "maxLength": 50 }
		},
		"required": ["session_id", "order_id"]
	}

};
