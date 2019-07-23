import express, { json, urlencoded, Router } from 'express';
import MapRoutes from './routes/main.routes';
import morgan from 'morgan';
let winston = require('../winston');

const app = express();

//Config
app.set('port', process.env.PORT || 4565);

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

//Middlewares
app.use(urlencoded({ extended: false }));
app.use(json()); // para capturar datos que se envian en el cuerpo de un request

//Map Routes
MapRoutes(app, Router());

app.use(morgan('combined', { stream: winston.stream }));

export default app;
