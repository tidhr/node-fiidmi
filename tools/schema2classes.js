#!/usr/bin/env node
/* Convert JSON files to JavaScript Object Constructors using JSON Schema */

var Q = require('q');
var is = require('nor-is');
var util = require('util');
var fs = require('nor-fs');

/** Check if module exists */
function module_exists(name) {
	try {
	    require.resolve(name);
		return true;
	} catch(e) {
		return false;
	}
}

/* */
function get_argv() {
	var argv = {}, using_optimist;

	if(module_exists('optimist')) {
		argv = require('optimist').argv;
		using_optimist = true;
	} else {
		console.warn("Warning! Please install `optimist` module for better user experience.");
		argv._ = process.argv.slice(2);
		using_optimist = false;
	}
	
	if( (argv._.length === 3) && (argv._[0] === 'compile') ) {
		argv.schema = argv._[1];
		argv.dir = argv._[2];
	} else if(!using_optimist) {
		console.error("USAGE: schema2classes compile SCHEMA DIR");
		process.exit(1);
	}
	return argv;
}

/** Builds Custom JavaScript Object Library from schema file */
function build_classes(opts) {
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
		var schema = JSON.parse(data);
		
		if(!is.obj(schema)) { throw new TypeError('schema is not valid'); }
		if(!is.obj(schema.definitions)) { throw new TypeError('schema is missing definitions'); }
		
		var mod = {};
		
		Object.keys(schema.definitions).forEach(function(type_name) {
			function Type(opts) {
				if(!(this instanceof Type)) {
					return new Type(opts);
				}
				opts = opts || {};
			};
			mod[type_name] = Type;
		});

		return mod;
	});
	return p;
}

/* The utility */
var argv = get_argv();
build_classes(argv).then(function(mod) {
	util.debug( util.inspect( mod ));
	console.log("All done!");
}).fail(function(err) {
	if(module_exists('prettified')) {
		require('prettified').errors.print(err);
	} else {
		console.warn("Warning! Please install optional prettified module for better error messages.");
		util.error(util.inspect(err));
	}
	process.exit(2);
}).done();

/* EOF */
