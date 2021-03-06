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
mod.build = function(build_opts) {
	build_opts = build_opts || {};
	var _schema = build_opts.schema;

	// User defined customizations
	var _user_defined = build_opts.orm || {};
	var _user_defined_constructors = _user_defined.constructors || {};
	var _user_defined_methods = _user_defined.methods || {};
	
	if(!is.obj(_schema)) { throw new TypeError('schema is not valid'); }
	if(!is.obj(_schema.definitions)) { throw new TypeError('schema is missing definitions'); }

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
		
		if(!( Object.prototype.hasOwnProperty.call(_schema.definitions, type_name) && is.def(_schema.definitions[type_name]) )) {
			throw new TypeError("No definition for " + type_name);
		}
		var definition = _schema.definitions[type_name];

		// ParentType is either SchemaObject or another definition
		var ParentType = SchemaObject;
		if( is.obj(definition) && is.def(definition['$ref']) && string_starts_with(definition['$ref'], '#/definitions/') ) {
			ParentType = create_constructor( definition['$ref'].split('/').slice(2).join('/') );
		}

		// FIXME: If a type has $refs, we should create a copy of schema which defines all those $refs.
		// Currently just copies schema and changes it to point our definition. Not ideal solution.
		var copy_definition = JSON.parse(JSON.stringify(_schema));
		_schema.oneOf = [{"$ref": '#/definitions/'+type_name }];

		/* This is our real constructor which will be called in `new Function()` */
		function _constructor(opts) {
			var tmp;
			
			ParentType.call(this, opts);
			if(!SchemaObject.valid(this, definition)) { throw new TypeError("Options are not valid"); }

			if(Object.prototype.hasOwnProperty.call(_user_defined_constructors, type_name)) {
				tmp = _user_defined_constructors[type_name].call(this, opts);
				if(is.def(tmp)) {
					SchemaObject.prototype._setValueOf.call(this, tmp);
				}
			}

		}

		var func_name = escape_func_name(type_name);

		// JavaScript does not support better way to change function names...
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

		// User-defined methods
		function post_user_defines(context) {
			if(Object.prototype.hasOwnProperty.call(_user_defined_methods, type_name)) {
				_user_defined_methods[type_name].call(context, Type, context);
			}
		}
		
		post_user_defines({'constructors':constructors, 'schema':_schema});

		return constructors[type_name];
	}
	
	Object.keys(_schema.definitions).forEach(create_constructor);

	return constructors;
};

/* EOF */
