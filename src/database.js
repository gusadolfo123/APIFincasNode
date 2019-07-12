// import MongoClient from 'mongodb';

// export async function connect() {
// 	try {
// 		const client = await MongoClient.connect('mongodb://localhost', {
// 			useNewUrlParser: true,
// 		});
// 		const db = client.db('alquiler');
// 		console.log(`DB is Connected`);
// 		return db;
// 	} catch (error) {
// 		throw new Error(`Error al intentar conectar con la base de datos: ${error}`);
// 	}
// }

import mongoose from 'mongoose';

export async function connect() {
	try {
		const db = await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
		});
		console.log(`DB is connected`);
		return db;
	} catch (error) {
		throw `Error al intentar conectar con la base de datos: ${error}`;
	}
}

export async function disconnect() {
	try {
		await mongoose.disconnect();
		console.log(`DB is disconnected`);
	} catch (error) {
		throw `Error al intentar cerrar conexion con la base de datos ${error}`;
	}
}
