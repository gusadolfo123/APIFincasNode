import glob from 'glob';
import path from 'path';

module.exports = function(app, router) {
	glob.sync('./src/routes/**/*.js').forEach(file => {
		if (!file.includes('main.routes.js')) {
			// require('E:\\Desarrollo Cursos\\Curso NodeJs\\APIFincasNode\\src\\routes\\user.routes.js')(router);
			app.use(require(path.resolve(file))(router));
		}
	});
};
