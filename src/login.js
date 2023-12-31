var db = require('../models');

module.exports.userSearch = function (req, res) {
  var sql = "SELECT * from user where id=2";
// 	var sql = "SELECT name,id FROM Users WHERE login='" + req.body.login + "'";
	db.sequelize.query(sql, {
		model: db.User
	}).then(user => {
		if (user.length) {
			var output = {
				user: {
					name: user[0].name,
					id: user[0].id
				}
			}
			res.render('app/usersearch', {
				output: output
			})
		} else {
			req.flash('warning', 'User not found')
			res.render('app/usersearch', {
				output: null
			})
		}
	}).catch(err => {
		req.flash('danger', 'Internal Error')
		res.render('app/usersearch', {
			output: null
		})
	})
}
