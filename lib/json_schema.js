/* */

// JSON schema validator
var Q = require('q');
var JaySchema = require('jayschema');
var json_schema = new JaySchema();
var json_schema_validate = Q.nfbind(json_schema.validate.bind(json_schema));

/*
function not_valid (i, schema) {
	var defer = Q.defer();
	json_schema.validate(i, schema, function(errs) {
		if(errs) {
			defer.resolve(errs);
		} else {
			defer.resolve(false);
		}
	});
	return defer.promise;
}
*/

module.exports = {
//	'notValid': not_valid,
	'validate': json_schema_validate
};

/* EOF */
