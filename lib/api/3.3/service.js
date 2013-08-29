module.exports = {

	// http://fiidmi.fi/documentation/service#policy
	'policy': {
		"type": "object",
		"properties": {
			"language": { "type": "string", "pattern":"^(fi|en)$" }
		},
		"required": ["language"]
	}

};
