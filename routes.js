var staticController = require('./controllers/staticController.js');

module.exports = function(app) {
	app.get('/', staticController.index);
}
