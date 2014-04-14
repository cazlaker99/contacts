exports.index = function(req, res){
	res.render('index', {title: 'Contacts', message: 'Welcome!'});
};
