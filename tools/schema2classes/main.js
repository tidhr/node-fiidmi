#!/usr/bin/env node
"use strict";

/* Convert JSON files to JavaScript Object Constructors using JSON Schema */

var is = require('nor-is');
var util = require('util');
var orm = require('json-schema-orm');

/** Read schema from file */
function read_schema_file(opts) {
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
}

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

/* The utility */
var argv = get_argv();
read_schema_file(argv).then(function(schema) {
	return orm.build({'schema': schema});
}).then(function(mod) {
	util.debug( util.inspect( mod ));
	//util.debug( mod.Restaurant.toSource() );
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
