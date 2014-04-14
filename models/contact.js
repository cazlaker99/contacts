var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
	name: {
			first: String,
			last: String
		},
		company: String,
		title: String,
		email: String
});

module.exports = mongoose.model('Contact', contactSchema);
