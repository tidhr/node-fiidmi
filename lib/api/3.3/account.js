module.exports = {
	// http://fiidmi.fi/documentation/account#account_login
	"login": {
		"type": "object",
		"properties": {
			"username":     { "type": "string" },
			"password":     { "type": "string" },
			"api_key":      { "type": "string" },
			"secret":       { "type": "string" },
			"language":     { "type": "string", "pattern": "^(english|finnish)$" },
		},
		"required": ["username", "password", "api_key", "secret"]
	},

	// http://fiidmi.fi/documentation/account#account_logout
	"logout": {
		"type": "object",
		"properties": {
			"session_id":     { "type": "string" },
		},
		"required": ["session_id"]
	},

	// http://fiidmi.fi/documentation/account#account_check_login
	"check_login": {
		"type": "object",
		"properties": {
			"session_id":     { "type": "string" },
		},
		"required": ["session_id"]
	},

	// http://fiidmi.fi/documentation/account#account_register
	"register": {
		"type": "object",
		"properties": {
			"username":     { "type": "string", "minLength": 2, "maxLength": 50 },
			"password":     { "type": "string", "minLength": 4, "maxLength": 512 },
			"forename":     { "type": "string", "minLength": 2, "maxLength": 100 },
			"surname":      { "type": "string", "minLength": 2, "maxLength": 100 },
			"email":        { "type": "string", "minLength": 2, "maxLength": 200 },
			"phone_number": { "type": "string", "minLength": 2, "maxLength": 30 },
			"language":     { "type": "string", "pattern": "^(english|finnish)$" },
		},
		"required": ["username", "password", "forename", "surname", "email", "phone_number"]
	},

	// http://fiidmi.fi/documentation/account#account_modify
	"modify": {
		"type": "object",
		"properties": {
			"session_id":   { "type": "string", "minLength": 2, "maxLength": 50 },
			"password":     { "type": "string", "minLength": 4, "maxLength": 512 },
			"forename":     { "type": "string", "minLength": 2, "maxLength": 100 },
			"surname":      { "type": "string", "minLength": 2, "maxLength": 100 },
			"email":        { "type": "string", "minLength": 2, "maxLength": 200 },
			"phone_number": { "type": "string", "minLength": 2, "maxLength": 30 }
		},
		"required": ["session_id" ]
	}

};
