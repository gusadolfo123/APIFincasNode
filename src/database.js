import MongoClient from 'mongodb';

export async function connect() {
	try {
		const client = await MongoClient.connect('mongodb://localhost', {
			useNewUrlParser: true,
		});
		const db = client.db('alquiler');
		console.log(`DB is Connected`);
		return db;
	} catch (error) {
		throw new Error(`Error al intentar conectar con la base de datos: ${error}`);
	}
}
