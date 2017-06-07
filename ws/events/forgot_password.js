var FORGOT_PASSWORD = require('../../constants/ws_types.js').FORGOT_PASSWORD;
module.exports = function(connection, socket, transporter){
	return function(data){
		connection.query('SELECT name,email,password FROM `users` WHERE email = "'+data.email+'"', function(err, result){
			if(result && result.length != 0){
				transporter.sendMail({
					from: 'kidastate <kidastatetest@gmail.com>',
					to: result[0].email,
					subject: 'Востановление пароля',
					text: "Здравствуйте, "+result[0].name+"! Ваш пароль: "+result[0].password
				}, function(err){
					if(err)
						socket.emit(FORGOT_PASSWORD, false);
					else
						socket.emit(FORGOT_PASSWORD, true);
				});
			} else {
				socket.emit(FORGOT_PASSWORD, false);
			}
		});
	}
}