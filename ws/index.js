var types = require('../constants/ws_types.js');
var login = require('./events/login.js');
var forgotPassword = require('./events/forgot_password.js');

module.exports = function initWSEventListeners(io, connection, transporter){
	io.on('connection', function(socket){
		socket.on(types.LOGIN, login(connection, socket));
		socket.on(types.FORGOT_PASSWORD, forgotPassword(connection, socket, transporter));
	})
}