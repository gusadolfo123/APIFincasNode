import mongoose from 'mongoose';
import { MONGODB_URL } from '../config';

export default (() => {
	let instance = null,
		isDisconnecting = false;

	mongoose.connection.on('connected', function() {
		console.log('Mongoose default connection is open to ', MONGODB_URL);
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

	async function connect() {
		instance = await mongoose.connect(
			MONGODB_URL,
			{
				useNewUrlParser: true,
				useCreateIndex: true,
			},
			function(err) {
				if (err) throw err;
				console.log('Conectado satisfactoriamente al servidor de Mongo!');
			},
		);
		return instance;
	}

	async function disconnect() {
		if (instance && !isDisconnecting) {
			isDisconnecting = true;
			console.log('Desconectando instancia de Mongo');
			await instance.connection.close((err, result) => {
				if (err) {
					isDisconnecting = false;
					throw err;
				}
				console.log('Instancia de Mongo desconectada!');
			});
		}
	}

	return {
		connect,
		disconnect,
		instance: () => instance,
	};
})();
