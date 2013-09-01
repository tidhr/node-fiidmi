/* Convert JSON files to JavaScript Object Constructors using JSON Schema */
"use strict";

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

	// This is a cache for built constructors
	var constructors = {};

	/** Escapes function names */
	function escape_func_name(str) {
		return str.replace(/[^a-zA-Z0-9_]+/g, "_");
	}

	/** Returns true if `str` starts with same string as `what` */
	function string_starts_with(str, what) {
		return (str.substr(0, what.length) === what) ? true : false;
	}

	/** Creates a new constructor unless it's created already */
	function create_constructor(type_name) {
		
		if(Object.prototype.hasOwnProperty.call(constructors, type_name)) {
			return constructors[type_name];
		}
		
		if(!( Object.prototype.hasOwnProperty.call(schema.definitions, type_name) && is.def(schema.definitions[type_name]) )) {
			throw new TypeError("No definition for " + type_name);
		}
		var definition = schema.definitions[type_name];

		// FIXME: If the definition is directly a $ref to another object, we should use it as a base constructor instead of SchemaObject.
		var ParentType = SchemaObject;
		if( is.obj(definition) && is.def(definition['$ref']) && string_starts_with(definition['$ref'], '#/definitions/') ) {
			ParentType = create_constructor( definition['$ref'].split('/').slice(2).join('/') );
		}

		// FIXME: If a type has $refs, we should create a copy which defines all those $refs.

		function _constructor(opts) {
			ParentType.call(this, opts);
			if(!SchemaObject.valid(this, definition)) { throw new TypeError("Options are not valid"); }
			// FIXME: Here we should enable optional custom code (for transformations etc)
		}

		var func_name = escape_func_name(type_name);

		var code = [
			'function '+func_name+' (opts) {',
			'	if(!(this instanceof '+func_name+')) {',
			'		return new '+func_name+'(opts);',
			'	};',
			'	_constructor.call(this, opts);',
			'};'
		];
		
		var Type = (new Function('_constructor', 'return '+code.join('\n')))(_constructor);

		util.inherits(Type, ParentType);

		constructors[type_name] = Type;
		return constructors[type_name];
	}
	
	Object.keys(schema.definitions).forEach(create_constructor);

	return constructors;
};

/* EOF */
