process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');

describe('home page', function() {
	var browser, server;
	before(function() {
		server = app.listen(3000);
		browser = new Browser({site: 'http://localhost:3000'});
	});
	it('should show welcome', function(done) {
		browser.visit("/", function(e, b, status) {
			assert.ok(browser.success);
			assert.equal(browser.text('p'), 'Welcome!');
		});
		done();
	});
	after(function(done) {
		server.close(done);
	});
});
