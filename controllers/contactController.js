var contact = require('../models/contact.js');

// Display empty form to create a new contact

exports.new = (function (req, res) {
	res.render('contact_new', {pagetitle: 'New Contact'});
});

// Save new contact
exports.save = (function (req, res) {
	new contact({
		name: {first: req.body.first, last: req.body.last},
		company: req.body.company,
		title: req.body.jobtitle,
		email: req.body.email
	}).save();
	req.flash('info', req.body.first + ' ' + req.body.last + ' added successfully.');
	
	res.redirect('/contacts');
});

//Get all contacts
exports.list = (function (req, res) {
	contact.find(function (err, contacts) {
		res.render('contacts', {
			pagetitle: 'Contacts',
			contacts: contacts,
			messages: req.flash('info')
		});
	});
});

exports.validate = (function(req, res) {
	req.assert('first', 'First name is required').notEmpty();
	req.assert('last', 'Last name is required').notEmpty();
	var errors = req.validationErrors();
	
	if (!errors) {
		var jsonData = {"status": "success"};
		res.json(jsonData);
	} else {
		var jsonData = {"status": "errors"};
		jsonData.fields = [];
		
		for (var i = 0; i < errors.length; i++) {
			jsonData.fields[i] = {field: errors[i].param, msg: errors[i].msg};
		}
	
		res.json(jsonData);
	}
});

exports.edit = (function (req, res) {
	contact.findById(req.param('id'), function(error, contact) {
		res.render('contact_edit', {
				pagetitle: 'Edit Contact',
					contact: contact
		});
	});
});

exports.update = (function(req, res) {
	contact.update({_id: req.param('id')}, {
		name: {first: req.body.first, last: req.body.last},
		company: req.body.company,
		title: req.body.jobtitle,
		email: req.body.email
	}, function(error, docs) {
		if (error) {
			next(error);
		} else {
			req.flash('info', req.body.first + ' updated.');
			res.redirect('/contacts');
		}
	});
});

exports.delete = (function(req, res) {
	contact.remove({_id: req.param('id')}, function(error, docs) {
		req.flash('info', 'Contact deleted.');
		res.redirect('/contacts')
	});
});
