import '@babel/polyfill';
// import app from './server';
import { app } from './server';
import { MongoConnection } from './database';

// const mongoClient = new MongoConnection();

// (async function main() {
// 	await app.listen(app.get('port'));
// 	console.log(`Server Running on Port ${app.get('port')}`);

// 	await mongoClient.connect();

// 	process.on('SIGINT', closeApp);
// 	process.on('SIGTERM', closeApp);
// })();

// async function closeApp() {
// 	await mongoClient.disconnect().then(() => process.exit(0));
// }

class Main {
	constructor() {
		this.mongoClient = new MongoConnection();
	}

	async initializeApp(app) {
		await app.listen(app.get('port'));
		console.log(`Server Running on Port ${app.get('port')}`);

		await this.mongoClient.connect();

		process.on('SIGINT', this.closeApp);
		process.on('SIGTERM', this.closeApp);
	}

	async closeApp() {
		await this.mongoClient.disconnect().then(() => process.exit(0));
	}
}

new Main().initializeApp(app);

// const Main = {
// 	mongoClient: new MongoConnection(),
// 	initializeApp: async function(app) {
// 		await app.listen(app.get('port'));
// 		console.log(`Server Running on Port ${app.get('port')}`);

// 		await this.mongoClient.connect();

// 		process.on('SIGINT', this.closeApp);
// 		process.on('SIGTERM', this.closeApp);
// 	},
// 	closeApp: async () => {
// 		await this.mongoClient.disconnect().then(() => process.exit(0));
// 	},
// };

// Main.initializeApp(app);

// function Main() {
// 	this.mongoClient = new MongoConnection();

// 	this.initializeApp = async function(app) {
// 		await app.listen(app.get('port'));
// 		console.log(`Server Running on Port ${app.get('port')}`);

// 		await this.mongoClient.connect();

// 		process.on('SIGINT', this.closeApp);
// 		process.on('SIGTERM', this.closeApp);
// 	};

// 	this.closeApp = async function() {
// 		await this.mongoClient.disconnect().then(() => process.exit(0));
// 	};
// }

// const mainApp = new Main();
// mainApp.initializeApp(app);
