import '@babel/polyfill';
import app from './server';
import { MongoConnection } from './database';

const mongoClient = new MongoConnection();

(async function main() {
	await app.listen(app.get('port'));
	console.log(`Server Running on Port ${app.get('port')}`);

	await mongoClient.connect();

	process.on('SIGINT', closeApp);
	process.on('SIGTERM', closeApp);
})();

async function closeApp() {
	await mongoClient.disconnect().then(() => process.exit(0));
}
