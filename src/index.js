import '@babel/polyfill';
import app from './server';

(async function main() {
	await app.listen(app.get('port'));
	console.log(`Server Running on Port ${app.get('port')}`);
})();
