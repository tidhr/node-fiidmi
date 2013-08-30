module.exports = {

	// http://fiidmi.fi/documentation/restaurant_list
	'list': {
		"type": "object",
		"properties": {
			"session_id":      { "type": "string", "maxLength": 50 },
			"address":         { "type": "string", "maxLength": 150 },
			"postal_code":     { "type": "string", "maxLength": 5 },
			"city":            { "type": "string", "maxLength": 100 },
			"radius":          { "type": "string", "maxLength": 50 },
			"chain_id":        { "type": "string", "maxLength": 50 },
			"sort_by":         { "type": "string", "maxLength": 50 },
			"latitude":        { "type": "string", "pattern": "^[0-9]{2}\.[0-9]{6}$" },
			"longitude":       { "type": "string", "pattern": "^[0-9]{2}\.[0-9]{6}$" }
		}
		//"required": ["session_id"] // Docs say it's required but other sites can call without it...
	},

	// http://fiidmi.fi/documentation/restaurant_get
	'get': {
		"type": "object",
		"properties": {
			"session_id":      { "type": "string", "minLength": 2, "maxLength": 200 },
			"restaurant_id":      { "type": "string", "minLength": 2, "maxLength": 200 }
		},
		"required": ["restaurant_id"]
	},

	// http://fiidmi.fi/documentation/restaurant_timetable
	'timetable': {
		"type": "object",
		"properties": {
			"restaurant_id":      { "type": "string", "minLength": 2, "maxLength": 200 }
		},
		"required": ["restaurant_id"]
	},

	// http://fiidmi.fi/documentation/restaurant_timetable
	'rate': {
		"type": "object",
		"properties": {
			"user_id":            { "type": "string", "minLength": 2, "maxLength": 200 },
			"restaurant_id":      { "type": "string", "minLength": 2, "maxLength": 200 },
			"review":             { "type": "string", "minLength": 2, "maxLength": 200 },
			"portion_size":       { "type": "string", "minLength": 2, "maxLength": 200 },
			"portion_quality":    { "type": "string", "minLength": 2, "maxLength": 200 },
			"restaurant_menu":    { "type": "string", "minLength": 2, "maxLength": 200 },
			"qpr":                { "type": "string", "minLength": 2, "maxLength": 200 },
			"enjoyment":          { "type": "string", "minLength": 2, "maxLength": 200 },
			"service":            { "type": "string", "minLength": 2, "maxLength": 200 },
			"location":           { "type": "string", "minLength": 2, "maxLength": 200 }
		},
		"required": ["restaurant_id", "user_id"]
	},

	// http://fiidmi.fi/documentation/restaurant_rating
	'rating': {
		"type": "object",
		"properties": {
			"restaurant_id":      { "type": "string", "minLength": 2, "maxLength": 200 }
		},
		"required": ["restaurant_id"]
	},

	// http://fiidmi.fi/documentation/restaurant_chains
	'chains': {
		"type": "object",
		"properties": {
		},
		"required": []
	},

	// http://fiidmi.fi/documentation/restaurant_make_order
	'make_order': {
		"type": "object",
		"properties": {
			"session_id":                      { "type": "string", "minLength": 2, "maxLength": 200 },
			"user_id":                         { "type": "string", "minLength": 2, "maxLength": 200 },
			"restaurant_id":                   { "type": "string", "minLength": 2, "maxLength": 200 },
			"validate_against_restaurant_id":  { "type": "string", "minLength": 2, "maxLength": 200 },
			"forename":                        { "type": "string", "minLength": 2, "maxLength": 200 },
			"surname":                         { "type": "string", "minLength": 2, "maxLength": 200 },
			"email":                           { "type": "string", "minLength": 2, "maxLength": 200 },
			"phone_number":                    { "type": "string", "minLength": 2, "maxLength": 200 },
			"products": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"product_id":          { "type": "string", "minLength": 2, "maxLength": 200 },
						"variant_id":          { "type": "string", "minLength": 2, "maxLength": 200 },
						"price":               { "type": "string", "minLength": 2, "maxLength": 200 },
						"side_dish":           { "type": "string", "minLength": 2, "maxLength": 200 },
						"changed_ingredients": { "type": "string", "minLength": 2, "maxLength": 200 },
						"added_ingredients":   { "type": "string", "minLength": 2, "maxLength": 200 },
						"extras":              { "type": "string", "minLength": 2, "maxLength": 200 }
					}
				}
			},
			"delivery_address": {
				"type": "object",
				"oneOf": [
					{ "type": "string", "minLength": 2, "maxLength": 200 },
					{
						"type": "object",
						"properties": {
							"address":     { "type": "string", "minLength": 2, "maxLength": 200 },
							"city":        { "type": "string", "minLength": 2, "maxLength": 200 },
							"postal_code": { "type": "string", "minLength": 2, "maxLength": 200 }
						}
					}
				]
			},
			"delivery_method":                 { "type": "string", "minLength": 2, "maxLength": 200 },
			"additional_info":                 { "type": "string", "minLength": 2, "maxLength": 200 },
			"delivery_price":                  { "type": "string", "minLength": 2, "maxLength": 200 },
			"total_price":                     { "type": "string", "minLength": 2, "maxLength": 200 },
			"alternative_delivery_time":       { "type": "string", "minLength": 2, "maxLength": 200 },
			"small_order_additional_fee":      { "type": "string", "minLength": 2, "maxLength": 200 },
			"payment_data": {
				"type": "object",
				"properties": {
					"method":              { "type": "string", "minLength": 2, "maxLength": 200 },
					"used_bonus":          { "type": "string", "minLength": 2, "maxLength": 200 },
					"used_po_credit":      { "type": "string", "minLength": 2, "maxLength": 200 },
					"redirect_to":         { "type": "string", "minLength": 2, "maxLength": 150 }
				},
				"required": ["method"]
			}
		},
		"required": ["session_id", "restaurant_id", "products", "delivery_address", "delivery_method", "delivery_price", "total_price", "payment_data"]
	},

	// http://fiidmi.fi/documentation/restaurant_timetable
	'order_status': {
		"type": "object",
		"properties": {
			"order_id":        { "type": "string", "minLength": 2, "maxLength": 200 },
			"session_id":      { "type": "string", "minLength": 2, "maxLength": 200 }
		}
	}

};
