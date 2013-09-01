/* User defined customizations for JSON Schema based ORM */
module.exports = {
	'constructors': {
		'Integer': function(opts) {
			return parseInt(opts, 10);
		}
	},
	'methods': {
		'Restaurant': function(Restaurant, types) {
			/** Implement custom `Restaurant.test()` */
			Restaurant.prototype.test = function() {
			};
		}
	}
};
/* EOF */
