import mongoose from 'mongoose';
import { MONGODB_URL } from '../config';
import { isNullOrUndefined } from 'util';

export class MongoConnection {
	constructor() {
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
	}

	async getInstance() {
		if (isNullOrUndefined(this.instance)) await this.connect();
		return this.instance;
	}

	async connect() {
		this.instance = await mongoose.connect(MONGODB_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
		});
	}

	async disconnect() {
		await this.instance.close((err, result) => {
			if (err) throw err;
			console.log('Instancia de Mongo desconectada!');
		});
	}
}
