import mongoose from 'mongoose';

export async function connect() {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
		});
		console.log(`DB is connected`);
	} catch (error) {
		throw `Error al intentar conectar con la base de datos: ${error}`;
	}
}

export async function disconnect() {
	try {
		console.log(55);
		await mongoose.disconnect();
		console.log(66);
		console.log(`DB is disconnected`);
	} catch (error) {
		console.log(77);
		throw `Error al intentar cerrar conexion con la base de datos ${error}`;
	}
}
