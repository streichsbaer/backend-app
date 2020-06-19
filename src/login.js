require('./current_file').file(__filename);

var query = 'SELECT * from user where id=' + req.body.login + ';';
