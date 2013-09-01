/* Convert JSON files to JavaScript Object Constructors using JSON Schema */

var tv4 = require('tv4');
var is = require('nor-is');
var util = require('util');

/** Base constructor */
function SchemaObject(opts, schema) {
	if(!(this instanceof SchemaObject)) {
		return new SchemaObject(opts);
	}
	if(!schema) { throw new TypeError("schema not set"); }

	// Validate using schema
	var result = tv4.validateResult(opts, schema);
	if(!result.valid) { throw new TypeError("Options are not valid"); }

	this._schema = schema;
	this._data = opts;
};

/** Get the primitive value of the object */
SchemaObject.prototype.valueOf = function() {
	return this._data;
};

/** Get the string presentation of the object */
SchemaObject.prototype.toString = function() {
	return ''+this._data;
};

/** Validates the object
 * @returns {object} An object like `{"valid": false, "error": {...}, "missing": [...]}`
 */
SchemaObject.prototype.validate = function() {
	return tv4.validateResult(self.valueOf(), this._schema);
};

/** Returns true if the object is valid, otherwise false.
 * @returns {boolean} Result of validation.
 */
SchemaObject.prototype.valid = function() {
	return this.validate().valid;
};

// Exports
module.exports = SchemaObject;

/* EOF */
