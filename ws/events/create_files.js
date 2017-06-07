var CREATE_FILES = require('../../constants/ws_types.js').CREATE_FILES;
module.exports = function(connection, socket, fs){
	return function(data){
		connection.query('SELECT id FROM `users` WHERE email = "'+data.email.toLowerCase()+'" and password = "'+data.password+'"', function(err, result){
			if(result && result.length != 0){
				fs.stat('storage/' + result[0].id, function(error_message, folder){
					if(error_message || !folder){
						fs.mkdir('storage/' + result[0].id, function(error){
							if (!error){
								for(var i = 0; i < data.files.length; i++){
									fs.appendFile('storage/'+ result[0].id + '/' + data.names[i], data.files[i], function(status){
										if(!status){
											socket.emit(CREATE_FILES, {status: true, message: status});
										} else {
											socket.emit(CREATE_FILES, {status: false, message: status});
										}
									});
								}
							} else {
								socket.emit(CREATE_FILES, {status: false, message: status});
							}
						});
					} else {
						for(var i = 0; i < data.files.length; i++){
							fs.appendFile('storage/' + result[0].id + '/' + data.names[i], data.files[i], function(error){
								if(!error){
									socket.emit(CREATE_FILES, {status: true, message: error});
								} else {
									socket.emit(CREATE_FILES, {status: false, message: error});
								}
							});
						}
					}
				});
			} else {
				socket.emit(CREATE_FILES, {status:false, message: err});
			}
		});
	}
}