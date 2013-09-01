/* User defined customizations for ORM of JSON Schema */
module.exports = {
	'constructors': {
		'Integer': function(opts) {
			return parseInt(opts, 10);
		}
	},
	'methods': {
		'Restaurant': function(Restaurant) {
			/** Implement custom `Restaurant.test()` */
			Restaurant.prototype.test = function() {
			};
		}
	}
};
/* EOF */
