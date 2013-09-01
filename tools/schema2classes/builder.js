/* Convert JSON files to JavaScript Object Constructors using JSON Schema */

var mod = module.exports = {};

var is = require('nor-is');
var util = require('util');
var SchemaObject = require('./SchemaObject.js');

/** Read schema from file */
mod.read = function(opts) {
	var Q = require('q');
	var fs = require('nor-fs');
	opts = opts || {};
	var schema_file = opts.schema;
	var p = Q.fcall(function() {
		if(!schema_file) { throw new TypeError("bad argument: opts.schema"); }
		return fs.exists(schema_file).then(function(e){ if(e){return fs.stat(schema_file);} });
	}).then(function (schema_stat) {
		if((!schema_stat) || (!schema_stat.isFile()) ) {
			throw new TypeError("Schema not file: " + schema_file);
		}
		return fs.readFile(schema_file, {'encoding':'utf8'});
	}).then(function(data) {
		return JSON.parse(data);
	});
	return p;
};

/** Build Custom JavaScript constructors using JSON schema definitions */
mod.build = function(opts) {
	opts = opts || {};
	var schema = opts.schema;
		
	if(!is.obj(schema)) { throw new TypeError('schema is not valid'); }
	if(!is.obj(schema.definitions)) { throw new TypeError('schema is missing definitions'); }
		
	var mod = {};
		
	Object.keys(schema.definitions).forEach(function(type_name) {

		// FIXME: If a type has $refs, we should create a copy which defines all those $refs.
		var type_schema = schema.definitions[type_name];

		function Type(opts) {
			if(!(this instanceof Type)) {
				return new Type(opts);
			}
			SchemaObject.call(this, opts, type_schema );

			// FIXME: Here we should transform 
		};
		util.inherits(Type, SchemaObject);

		mod[type_name] = Type;
	});

	return mod;
};

/* EOF */
