import mongoose from 'mongoose';
import { MONGODB_URL } from '../config';

export default (() => {
	let instance = null,
		isDisconnecting = false;

	mongoose.connection.on('connected', function() {
		console.log('Mongoose default connection is open to ', process.env.MONGODB_URL);
	});

	mongoose.connection.on('error', function(err) {
		console.log('Mongoose default connection has occured ' + err + ' error');
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose default connection is disconnected');
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose default connection is disconnected due to application termination');
			process.exit(0);
		});
	});

	function connect() {
		return new Promise((resolve, reject) => {
			mongoose.connect(
				MONGODB_URL,
				{
					useNewUrlParser: true,
					useCreateIndex: true,
				},
				function(err) {
					if (!err) reject(err);
					console.log('Conectado satisfactoriamente al servidor de Mongo!');
					instance = client;
					resolve();
				},
			);
		});
	}

	function disconnect() {
		if (instance && !isDisconnecting) {
			isDisconnecting = true;
			console.log('Desconectando instancia de Mongo');
			return new Promise((resolve, reject) => {
				instance.close((err, result) => {
					if (err) {
						reject(err);
						isDisconnecting = false;
						return;
					}
					console.log('Instancia de Mongo desconectada!');
					resolve();
				});
			});
		}
	}

	return {
		connect,
		disconnect,
		instance: () => instance,
	};
})();
