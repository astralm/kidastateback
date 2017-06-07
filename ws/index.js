var types = require('../constants/ws_types.js');
var login = require('./events/login.js');
var forgotPassword = require('./events/forgot_password.js');
var create_files = require('./events/create_files.js');

module.exports = function initWSEventListeners(io, connection, transporter, fs){
	io.on('connection', function(socket){
		socket.on(types.LOGIN, login(connection, socket));
		socket.on(types.FORGOT_PASSWORD, forgotPassword(connection, socket, transporter));
		socket.on(types.CREATE_FILES, create_files(connection, socket, fs));
	})
}