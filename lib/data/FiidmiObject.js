/* */

var util = require('util');
//var FiidmiObject = require('./FiidmiObject.js');

var _schema = {
	"title": "Base type of Fiidmi API objects",
	"type": "object",
	"properties": {
	}
};

function FiidmiObject(opts) {
	//FiidmiObject.call(this);
}

//util.inherits(FiidmiObject, FiidmiObject);

// Expose the JSON schema
FiidmiObject.schema = _schema;

// Exports
module.exports = FiidmiObject;

/* EOF */
