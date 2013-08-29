module.exports = {

	// http://fiidmi.fi/documentation/customer#customer_address_get
	'get': {
		"type": "object",
		"properties": {
			"session_id":      { "type": "string" }
		},
		"required": ['session_id']
	},

	// http://fiidmi.fi/documentation/customer#customer_address_set
	'set': {
		"type": "object",
		"properties": {
			"session_id":      { "type": "string", "minLength": 2, "maxLength": 50 },
			"address":         { "type": "string", "minLength": 1, "maxLength": 150 },
			"postal_code":     { "type": "string", "minLength": 1, "maxLength": 5 },
			"city":            { "type": "string", "minLength": 1, "maxLength": 100 },
			"latitude":        { "type": "string", "pattern": "^[0-9]{2}\.[0-9]{6}$" },
			"longitude":       { "type": "string", "pattern": "^[0-9]{2}\.[0-9]{6}$" }
		},
		"required": ['session_id', 'address', 'postal_code', 'city']
	},

	// http://fiidmi.fi/documentation/customer#customer_address_modify
	'modify': {
		"type": "object",
		"properties": {
			"session_id":      { "type": "string", "minLength": 2, "maxLength": 50 },
			"address_id":      { "type": "string", "minLength": 1, "maxLength": 50 },
			"address":         { "type": "string", "minLength": 1, "maxLength": 150 },
			"postal_code":     { "type": "string", "minLength": 1, "maxLength": 5 },
			"city":            { "type": "string", "minLength": 1, "maxLength": 100 },
			"latitude":        { "type": "string", "pattern": "^[0-9]{2}\.[0-9]{6}$" },
			"longitude":       { "type": "string", "pattern": "^[0-9]{2}\.[0-9]{6}$" }
		},
		"required": ['session_id', 'address_id']
	}
};
