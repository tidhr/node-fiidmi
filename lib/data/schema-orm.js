/* User defined constructors */
module.exports = {
	'constructors': {
		'Integer': function(opts) {
			return parseInt(opts, 10);
		}
	},
	'methods': function(types) {
		
		/** Implement custom `Restaurant.test()` */
		types.Restaurant.prototype.test = function() {
		};

	}
};
/* EOF */
