var LOGIN = require('../../constants/ws_types.js').LOGIN;
module.exports = function (connection, socket){
	return function(data){
		connection.query('SELECT phone, name, surname FROM `users` WHERE email = "'+data.email+'" and password = "'+data.password+'"', function(err, result){
			socket.emit(LOGIN, result);
		});
	}
}