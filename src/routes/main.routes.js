import { BASE_ADDRESS } from '../../config';
import glob from 'glob';
import path from 'path';

function MapRoutes(app, router) {
	glob.sync('./src/routes/**/*.js').forEach(file => {
		if (!file.includes('main.routes.js')) {
			app.use(BASE_ADDRESS, require(path.resolve(file))(router));
		}
	});
}

export default MapRoutes;
