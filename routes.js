var staticController = require('./controllers/staticController.js');
var contactController = require('./controllers/contactController.js');

module.exports = function(app) {
	app.get('/', staticController.index);
	
	app.get('/contacts/new', contactController.new);
	app.post('/contacts/new', contactController.save);
	app.get('/contacts', contactController.list);
	app.post('/contacts/validate', contactController.validate);
	app.get('/contacts/:id/edit', contactController.edit);
	app.post('/contacts/:id/edit', contactController.update);
	app.get('/contact/:id/delete', contactController.delete);

}
