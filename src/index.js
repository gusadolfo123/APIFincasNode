import '@babel/polyfill';
import app from './server';
import mongo from './database';

(async function main() {
	await app.listen(app.get('port'));
	console.log(`Server Running on Port ${app.get('port')}`);

	process.on('SIGINT', closeApp);
	process.on('SIGTERM', closeApp);
})();

function closeApp() {
	mongo.disconnect().then(() => process.exit(0));
}
