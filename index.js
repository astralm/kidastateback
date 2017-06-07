var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'kidsestatetest@gmail.com  ',
		pass: 'hftg^7hf$!ghbdtnltnb@1'
	}
});
var ENV = require('./env.js');
var sql = require('mysql');
var connection = sql.createConnection(ENV);
var io = require('socket.io')(require('http').createServer().listen(8080));
var fs = require('fs');
require('./ws/index.js')(io, connection, transporter, fs);
