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
io.on('connection', function(socket){
	socket.on('LOGIN', function(data){
		connection.query('SELECT phone, name, surname FROM `users` WHERE email = "'+data.email+'" and password = "'+data.password+'"', function(err, result){
			socket.emit('LOGIN', result);
		});
	});
	socket.on('FORGOT_PASSWORD', function(data){
		connection.query('SELECT name,email,password FROM `users` WHERE email = "'+data.email+'"', function(err, result){
			if(result && result.length != 0){
				transporter.sendMail({
					from: 'kidastate <kidastatetest@gmail.com>',
					to: result[0].email,
					subject: 'Востановление пароля',
					text: "Здравствуйте, "+result[0].name+"! Ваш пароль: "+result[0].password
				}, function(err){
					if(err)
						socket.emit('FORGOT_PASSWORD', false);
					else
						socket.emit('FORGOT_PASSWORD', true);
				});
			} else {
				socket.emit('FORGOT_PASSWORD', false);
			}
		});
	});
});
